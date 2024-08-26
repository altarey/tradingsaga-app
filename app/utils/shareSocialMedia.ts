import Share, {MultipleOptions, Options} from 'react-native-share';
import {WEBSITE_URL, SHARE_TITLE, GAME_SLOGAN} from '../config/constants';
import {dollarFormat} from './common-utils';

const DEFAULT_OPTIONS: Options | MultipleOptions = {
  title: SHARE_TITLE,
  url: WEBSITE_URL,
};

const shareSocialMedia = async (message: string) => {
  try {
    const shareResponse = await Share.open({
      ...DEFAULT_OPTIONS,
      message,
    });
    // TODO: handle shareResponse above for Telemetry
  } catch {}
};

export default shareSocialMedia;

export const shareSocialMediaRunResults = async (ROI: number, tickerName: string) => {
  const verb = ROI >= 0 ? 'made' : 'lost';
  const message = `I've just ${verb} ${dollarFormat(Math.abs(ROI))} trading ${tickerName} in ${SHARE_TITLE}\n` +
                  `${GAME_SLOGAN}. Trade for yourself!`;
  await shareSocialMedia(message);
};
