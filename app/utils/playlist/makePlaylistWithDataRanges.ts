import {getPlaylistItemData, Playlist, TickerDataFile} from '../../tickers';
import getTickerDateRange from '../getTickerDateRange';

export default function makePlaylistWithDateRanges(playlist: Playlist): Promise<Playlist> {
  return Promise.all(
    playlist.map(async (playlistItem) => {
      const tickerDateFile = (await getPlaylistItemData(playlistItem.playlistItemId)) as TickerDataFile;
      return {
        ...playlistItem,
        dateRange: getTickerDateRange(tickerDateFile.history),
      };
    }),
  );
}
