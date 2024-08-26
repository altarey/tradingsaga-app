import analytics from '@react-native-firebase/analytics';

const logScreenView = async (screenName: string) => {
  await analytics().logScreenView({screen_name: screenName, screen_class: screenName});
};

export default logScreenView;
