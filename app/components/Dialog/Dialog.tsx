import React from 'react';

import DialogWrapper from './DialogWrapper';
import DialogContainer, {DialogContainerProps} from './DialogContainer';

interface DialogProps {
  onBackgroundPress?: () => void;
  isBackgroundVisible?: boolean;
  onCloseIconButtonPress?: DialogContainerProps['onCloseIconButtonPress'];
  withCloseIconButton?: DialogContainerProps['withCloseIconButton'];
  containerStyle?: DialogContainerProps['style'];
}

const Dialog: React.FC<DialogProps> = (props) => {
  const {
    children,
    isBackgroundVisible,
    onBackgroundPress,
    onCloseIconButtonPress,
    withCloseIconButton,
    containerStyle,
  } = props;

  return (
    <DialogWrapper onBackdropPress={onBackgroundPress} isBackgroundVisible={isBackgroundVisible}>
      <DialogContainer
        onCloseIconButtonPress={onCloseIconButtonPress}
        withCloseIconButton={withCloseIconButton}
        style={containerStyle}>
        {children}
      </DialogContainer>
    </DialogWrapper>
  );
};

export default Dialog;
