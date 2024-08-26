import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {CONFIRMATION_CANCEL_ICON, CONFIRMATION_CONFIRM_ICON} from '../../config/icons';
import LoadingDialog from './LoadingDialog';
import IconButton from '../common/IconButton';
import useOnHardwareBackPress from '../../hooks/useOnHardwareBackPress';

import {DialogTitle, DialogWrapper, DialogContainer, DialogText, DialogActions} from '../Dialog';
import appScale from '../../utils/appScale';

const ICON_SIZE = appScale(52);

export interface ConfirmationDialogProps {
  title?: string | React.ReactElement<Text>;
  content: string | React.ReactElement<Text>;
  onCancel: () => void;
  onConfirm: () => void;
  loadingMessage?: string;
  shouldShowLoader?: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  content,
  onCancel,
  onConfirm,
  loadingMessage,
  shouldShowLoader = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
  };

  useOnHardwareBackPress(() => {
    onCancel();
    return true;
  });

  if (isLoading && shouldShowLoader) return <LoadingDialog loadingMessage={loadingMessage} />;

  return (
    <DialogWrapper onBackdropPress={onCancel}>
      <DialogContainer onCloseIconButtonPress={onCancel}>
        {!!title && <DialogTitle title={title} />}
        <DialogText text={content} />
      </DialogContainer>
      <DialogActions>
        <IconButton
          source={CONFIRMATION_CANCEL_ICON}
          containerStyle={styles.action}
          iconSize={ICON_SIZE}
          onPress={onCancel}
        />
        <View style={styles.actionSpace}/>
        <IconButton
          source={CONFIRMATION_CONFIRM_ICON}
          containerStyle={styles.action}
          iconSize={ICON_SIZE}
          onPress={handleConfirm}
        />
      </DialogActions>
    </DialogWrapper>
  );
};

export default ConfirmationDialog;

const styles = StyleSheet.create({
  action: {
    marginHorizontal: appScale(50),
  },
  actionSpace: {
    width: appScale(120),
  },
});
