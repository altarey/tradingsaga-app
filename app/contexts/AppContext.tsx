import React from 'react';

import {SafeAreaProvider, initialWindowMetrics} from 'react-native-safe-area-context';
import {AppStoreProvider} from './AppStore';
import {TutorialProvider} from './TutorialContext';
import {DialogsProvider} from './DialogsContext';
import {NetworkProvider} from './NetworkStateContext';
import {PlaylistProvider} from './PlaylistContext';
import {AppRateProvider} from './AppRateContext';
import {IapProvider} from './IapContext';

const AppContext: React.FC = ({children}) => (
  <SafeAreaProvider initialMetrics={initialWindowMetrics}>
    <NetworkProvider>
      <IapProvider>
        <AppStoreProvider>
          <AppRateProvider>
            <TutorialProvider>
              <DialogsProvider>
                <PlaylistProvider>
                  {children}
                </PlaylistProvider>
              </DialogsProvider>
           </TutorialProvider>
          </AppRateProvider>
        </AppStoreProvider>
      </IapProvider>
    </NetworkProvider>
  </SafeAreaProvider>
);

export default AppContext;
