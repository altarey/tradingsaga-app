import React from 'react';
import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import TutorialContent from './TutorialContent';
import appScale from '../../utils/appScale';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface TutorialDialogProps {
  onBackgroundPress?: () => void;
  contentStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  isAction?: boolean;
  disabled?: boolean;
}

const TutorialDialog: React.FC<TutorialDialogProps> = (props) => {
  const {
    children,
    onBackgroundPress,
    contentStyle,
    isAction = false,
    disabled,
    containerStyle,
  } = props;
  const tutorialContentStyles = [styles.contentContainer, contentStyle];
  const saferAreaInsets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.safeAreaView} pointerEvents="box-none">
      <View style={[styles.container, containerStyle, saferAreaInsets]} pointerEvents="box-none">
        {onBackgroundPress && (
          <TouchableWithoutFeedback disabled={disabled} onPress={onBackgroundPress} style={styles.background}>
            <View style={styles.background} />
          </TouchableWithoutFeedback>
        )}
        <TutorialContent isAction={isAction} style={tutorialContentStyles}>
          {children}
        </TutorialContent>
      </View>
    </SafeAreaView>
  );
};

export default TutorialDialog;

const styles = StyleSheet.create({
  safeAreaView: {
    position: 'absolute',
    zIndex: 1300,
    width: '100%',
    height: '100%',
  },
  container: {
    position: 'absolute',
    zIndex: 1300,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    zIndex: 1301,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flexDirection: 'column',
    padding: appScale(10),
    paddingHorizontal: appScale(35),
  },
});
