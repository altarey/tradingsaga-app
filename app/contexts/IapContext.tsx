import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import Iaphub, {IapHubProductInformation} from 'react-native-iaphub';
import useProcessState from '../hooks/useProcessState';
import {Alert} from 'react-native';
import {SUPPORT_EMAIL} from '../config/constants';
import {Telemetry} from '../utils/telemetry';

interface IapContextState {
  activeProducts: IapHubProductInformation[];
  productsForSale: IapHubProductInformation[];

  reloadProductsForSale: () => void;
  buy: (sku: string) => void;
  restore: () => void;
}

const IapContext = createContext<IapContextState>(undefined!);

export const IapProvider: React.FC = ({children}) => {
  const [activeProducts, setActiveProducts] = useState<IapContextState['activeProducts']>([]);
  const [productsForSale, setProductsForSale] = useState<IapContextState['productsForSale']>([]);

  useProcessState({
    onForeground: async () => setActiveProducts(await Iaphub.getActiveProducts()),
  });

  const reloadProductsForSale = useCallback(async () => {
    Telemetry.logIap('reload_products_for_sale', {});
    setProductsForSale(await Iaphub.getProductsForSale());
  }, []);

  const restore = useCallback(async () => {
    try {
      await Iaphub.restore();
      setActiveProducts(await Iaphub.getActiveProducts());
      setProductsForSale(await Iaphub.getProductsForSale());
      Telemetry.logIap('restore_success', {});
      Alert.alert(
        'Restore Purchases',
        'Your purchases have been restored!',
      );
    } catch (error) {
      Telemetry.logIap('restore_fail', {error});
      Alert.alert(
        'Restore Error',
        `We were not able to restore your purchases, please try again later or contact the support (${SUPPORT_EMAIL})`,
      );
    }
  }, []);

  const buy: IapContextState['buy'] = useCallback(async (sku) => {
    try {
      const transaction = await Iaphub.buy(sku);

      Telemetry.logIap('buy_success', {transaction});

      /*
       * The purchase has been successful but we need to check that the webhook to our server was successful as well
       * If the webhook request failed, IAPHUB will send you an alert and retry again in 1 minute, 10 minutes, 1 hour and 24 hours.
       * You can retry the webhook directly from the dashboard as well
       */
      if (transaction.webhookStatus === 'failed') {
        Alert.alert(
          'Purchase delayed',
          `Your purchase was successful but we need some more time to validate it, should arrive soon! Otherwise contact the support (${SUPPORT_EMAIL})`,
        );
      }
      // Everything was successful! Yay!
      else {
        Alert.alert(
          'Purchase successful',
          'Your purchase has been processed successfully!',
        );
        // Refresh the user to update the products for sale
        setActiveProducts(await Iaphub.getActiveProducts());
        setProductsForSale(await Iaphub.getProductsForSale());
      }
    } catch (err) {
      Telemetry.logIap('buy_fail', { errorMessage: err.message });

      // Purchase popup cancelled by the user (ios only)
      if (err.code === 'user_cancelled') return;
      // Couldn't buy product because it has been bought in the past but hasn't been consumed (restore needed)
      else if (err.code === 'product_already_owned') {
        Alert.alert(
          'Product already owned',
          'Please restore your purchases in order to fix that issue',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Restore', onPress: restore},
          ],
        );
      }
      // The payment has been deferred (its final status is pending external action such as 'Ask to Buy')
      else if (err.code === 'deferred_payment') {
        Alert.alert(
          'Purchase awaiting approval',
          'Your purchase has been processed but is awaiting approval',
        );
      }
      /*
       * The receipt has been processed on IAPHUB but something went wrong
       * It is probably because of an issue with the configuration of your app or a call to the Itunes/GooglePlay API that failed
       * IAPHUB will send you an email notification when a receipt fails, by checking the receipt on the dashboard you'll find a detailed report of the error
       * After fixing the issue (if there's any), just click on the 'New report' button in order to process the receipt again
       * If it is an error contacting the Itunes/GooglePlay API, IAPHUB will retry to process the receipt automatically as well
       */
      else if (err.code === 'receipt_validation_failed') {
        Alert.alert(
          'We\'re having trouble validating your transaction',
          'Give us some time, we\'ll retry to validate your transaction ASAP!',
        );
      }
      /*
       * The receipt has been processed on IAPHUB but is invalid
       * It could be a fraud attempt, using apps such as Freedom or Lucky Patcher on an Android rooted device
       */
      else if (err.code === 'receipt_invalid') {
        Alert.alert(
          'Purchase error',
          `We were not able to process your purchase, if you've been charged please contact the support (${SUPPORT_EMAIL})`,
        );
      }
      /*
       * The receipt hasn't been validated on IAPHUB (Could be an issue like a network error...)
       * The user will have to restore its purchases in order to validate the transaction
       * An automatic restore should be triggered on every relaunch of your app since the transaction hasn't been 'finished'
       * Android should automatically refund transactions that are not 'finished' after 3 days
       */
      else if (err.code === 'receipt_request_failed') {
        Alert.alert(
          'We\'re having trouble validating your transaction',
          `Please try to restore your purchases later (Button in the Shop) or contact the support (${SUPPORT_EMAIL})`,
        );
      }
      /*
       * The user has already an active subscription on a different platform (android or ios)
       * This security has been implemented to prevent a user from ending up with two subscriptions of different platforms
       * You can disable the security by providing the 'crossPlatformConflict' parameter to the buy method (Iaphub.buy(sku, {crossPlatformConflict: false}))
       */
      else if (err.code === 'cross_platform_conflict') {
        Alert.alert(
          `Seems like you already have a subscription on ${err.params.platform}`,
          'You have to use the same platform to change your subscription or wait for your current subscription to expire',
        );
      }
      // Couldn't buy product for many other reasons (the user shouldn't be charged)
      else {
        Alert.alert(
          'Purchase error',
          `We were not able to process your purchase, please try again later or contact the support (${SUPPORT_EMAIL})`,
        );
      }
    }
  }, [restore]);

  const value: IapContextState = useMemo(() => ({
    activeProducts,
    productsForSale,

    reloadProductsForSale,
    restore,
    buy,
  }), [activeProducts, productsForSale, restore, buy, reloadProductsForSale]);

  return (
    <IapContext.Provider value={value} children={children} />
  );
};

export const useIap = () => {
  const value = useContext(IapContext);

  if (typeof value === 'undefined') throw 'useIap must be used inside IapProvider';

  return value;
};
