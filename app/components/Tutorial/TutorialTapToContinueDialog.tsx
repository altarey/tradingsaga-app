import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import TutorialDialog from './TutorialDialog';
import TutorialText, {TutorialTextProps} from './TutorialText';
import Colors from '../../config/colors';
import AppSound from '../../utils/appSound';
import appScale from '../../utils/appScale';

export interface TutorialTapToContinueDialogProps {
  onTapToContinue: () => void;
  text?: TutorialTextProps['children'];
  contentStyle?: ViewStyle;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const TutorialTapToContinueDialog: React.FC<TutorialTapToContinueDialogProps> = (props) => {
  const {
    containerStyle,
    contentStyle,
    text,
    onTapToContinue,
    disabled,
  } = props;
  const contentStyles = [styles.content, !text && styles.contentWithoutText, contentStyle];

  const handleTapToContinue = () => {
    if (disabled) return;
    AppSound.play(AppSound.SOUNDS.TAP);
    onTapToContinue();
  };

  return (
    <TutorialDialog containerStyle={containerStyle} contentStyle={contentStyles} onBackgroundPress={handleTapToContinue}>
      <View style={[styles.container]}>
        {text && (
          <View style={styles.textContainer}>
            <TutorialText>{text}</TutorialText>
          </View>
        )}
        <View style={styles.buttonContainer}>
          <TutorialText isAction>Tap to continue</TutorialText>
        </View>
      </View>
    </TutorialDialog>
  );
};

export default TutorialTapToContinueDialog;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  textContainer: {
    marginBottom: appScale(16),
  },
  buttonContainer: {
    alignItems: 'center',
  },
  content: {
    borderColor: Colors.CAMARONE.default,
    borderWidth: 2,
  },
  contentWithoutText: {
    minWidth: appScale(140),
  },
});
