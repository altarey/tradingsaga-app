import React from 'react';
import {Linking, ScrollView, StyleSheet, Text} from 'react-native';
import {RobotoRegular} from '../../../config/fonts';
import {WEBSITE_URL, PRIVACY_AND_TERMS_URL, APP_TITLE, ALTAREY} from '../../../config/constants';
import {Telemetry} from '../../../utils/telemetry';
import ButtonsNames from '../../../config/buttonsNames';
import AppSound from '../../../utils/appSound';
import appScale from '../../../utils/appScale';

const HelpAboutUs = () => {
  const handleOpenBrandURL = async () => {
    AppSound.play(AppSound.SOUNDS.TAP);
    Telemetry.logPressButton(ButtonsNames.HELP_SCREEN_TABS_ABOUTS_US_WEBSITE_URL);
    await Linking.openURL(WEBSITE_URL);
  };

  const handleOpenPrivacyAndTerms = async () => {
    AppSound.play(AppSound.SOUNDS.TAP);
    Telemetry.logPressButton(ButtonsNames.HELP_SCREEN_TABS_ABOUTS_US_TERMS);
    await Linking.openURL(PRIVACY_AND_TERMS_URL);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>
        ${APP_TITLE} app has been designed by FantasyMesa team which belongs to ${ALTAREY} company. The headquarter
        office is located in New York, USA. Our team members are professionally strong individuals from different IT
        disciplines. Namely, the designers, scenario writer, game developers, software engineers, and marketing
        specialists. These people got together from all around the world - from the UK, the USA, Russia, Ukraine,
        Pakistan and India. It's hard work for several months to build this app. Hopefully, you'll enjoy this little
        game, and share your sentiments with us. Let's make the app even better together! {'\n\n'}
        Upon use of this app you agree to Terms of Use of this SERVICE. The service is provided as is. ${APP_TITLE} app
        respects and complies with EU GDPR regulations and California Consumer Privacy Act (CCPA). Refer to the Privacy
        Policy.
      </Text>
      <Text onPress={handleOpenBrandURL} style={[styles.brandURL, styles.text]}>
        {WEBSITE_URL}
      </Text>
      <Text onPress={handleOpenPrivacyAndTerms} style={[styles.privacyAndTerms, styles.text]}>
        Read our Privacy Policy and Terms/Conditions
      </Text>
    </ScrollView>
  );
};

export default HelpAboutUs;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: appScale(36),
  },
  text: {
    color: 'white',
    fontFamily: RobotoRegular,
    fontSize: appScale(16),
    textAlign: 'justify',
  },
  brandURL: {
    marginTop: appScale(24),
    textDecorationLine: 'underline',
  },
  privacyAndTerms: {
    marginTop: appScale(32),
    textDecorationLine: 'underline',
  },
});
