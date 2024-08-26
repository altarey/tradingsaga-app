import admob, {MaxAdContentRating} from '@react-native-firebase/admob';

export const configureAdmob = () =>
  admob().setRequestConfiguration({
    maxAdContentRating: MaxAdContentRating.PG,
    tagForChildDirectedTreatment: true,
    tagForUnderAgeOfConsent: true,
  });
