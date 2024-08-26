import {Playlist} from '../../tickers';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

import {Logger} from '../logger';
import {SHARE_FILE_NAME_PREFIX} from '../../config/constants';
import createPlaylistResultsInHTML from './createPlaylistResultsInHTML';
import {IS_iOS} from '../environment';

const sharePlaylistResults = async (playlist: Playlist) => {
  try {
    const options = {
      html: createPlaylistResultsInHTML(playlist),
      fileName: SHARE_FILE_NAME_PREFIX + '-playlist-results',
    };

    const file = await RNHTMLtoPDF.convert(options);

    const filePath = !IS_iOS ? `file://${file.filePath}` : file.filePath;

    if (typeof filePath !== 'string') throw new TypeError('filePath is not a string');

    const shareOptions = {
      type: 'application/pdf',
      url: filePath,
    };

    await Share.open(shareOptions);
  } catch (e) {
    Logger.logError(e);
  }
};

export default sharePlaylistResults;
