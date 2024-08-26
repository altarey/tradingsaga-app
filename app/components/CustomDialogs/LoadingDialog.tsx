import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import {DialogWrapper, DialogContainer, DialogText, DialogTitle} from '../Dialog';
import appScale from '../../utils/appScale';

export interface LoadingDialogProps {
  loadingMessage?: string;
  title?: string | React.ReactElement<Text>;
  withCloseIconButton?: boolean;
  onClose?: () => void;
}

const LoadingDialog: React.FC<LoadingDialogProps> = ({loadingMessage, title, withCloseIconButton = false, onClose}) => {
  return (
    <DialogWrapper>
      <DialogContainer withCloseIconButton={withCloseIconButton} onCloseIconButtonPress={onClose}>
        {title && <DialogTitle title={title} />}
        <View style={styles.container}>
          <DialogText text={loadingMessage ? loadingMessage : 'In Progress...'} />
          <ActivityIndicator style={styles.activityIndicator} color="white" />
        </View>
      </DialogContainer>
    </DialogWrapper>
  );
};

export default LoadingDialog;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  activityIndicator: {
    marginLeft: appScale(6),
  },
});
