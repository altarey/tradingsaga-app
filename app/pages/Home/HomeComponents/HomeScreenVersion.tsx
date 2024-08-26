import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {appVersion2} from '../../../utils/appVersion';
import {RobotoRegular} from '../../../config/fonts';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../../config/routes';
import {useTutorial} from '../../../contexts/TutorialContext';

const HomeScreenVersion: React.FC = () => {
  const navigation = useNavigation();
  const tutorial = useTutorial();

  const [versionPressed, setVersionPressed] = useState(0);
  const [storybookVisible, setStorybookVisible] = useState(false);


  const handleShowStoryBook = () => {
    if (!__DEV__) return;
    if (storybookVisible) return;
    if (versionPressed > 5) return setStorybookVisible(true);
    setVersionPressed((previousVersionPressed) => previousVersionPressed + 1);
  };

  const handleNavigateToStoryBook = () => {
    if (!__DEV__) return;
    navigation.navigate(Routes.STORYBOOK);
  };

  return (
    <View style={styles.versionContainer}>
      <Text style={styles.versionText} onPress={handleShowStoryBook}>
        {appVersion2()}
      </Text>
      {storybookVisible && __DEV__ ? (
        <View style={styles.storyBookButton}>
          <Button
            title="Storybook"
            disabled={tutorial.isInProgress}
            onPress={handleNavigateToStoryBook}
          />
        </View>
      ) : null}
    </View>
  );
};

export default HomeScreenVersion;

const styles = StyleSheet.create({
  storyBookButton: {
    right: 0,
    backgroundColor: 'red',
  },
  versionContainer: {
    justifyContent: 'flex-end',
    position: 'absolute',
  },
  versionText: {
    color: '#a3a3a3',
    fontSize: 14,
    fontFamily: RobotoRegular,
    paddingRight: 20,
    paddingBottom: 5,
    textAlign: 'right',
  },
});
