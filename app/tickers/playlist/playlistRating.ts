import {getPlaylistAsync, Playlist, PlaylistItemRating, savePlaylistAsync} from './playlist';
import {PLAYLIST_MINIMUM_ITEMS_FOR_RATING, PLAYLIST_RATING_SCORE} from '../../config/constants';
import {ImageSourcePropType} from 'react-native';

export interface RunResults {
  tradeReturn: number;
  stockReturn: number;
  indexReturn: number;
}

export async function savePlaylistItemRunResults(playlistItemId: string, runRating: PlaylistItemRating) {
  const playlist = await getPlaylistAsync();
  const newPlaylist = playlist.map((p) => {
    if (p.playlistItemId === playlistItemId) {
      if (typeof p.rating === 'undefined') return {...p, rating: runRating};
      if (p.rating.tradeReturn > runRating.tradeReturn) return p;
      return {...p, rating: runRating};
    }
    return p;
  });
  await savePlaylistAsync(newPlaylist);
}

export function calculateRunRating(runResults: RunResults): PlaylistItemRating {
  return {
    tradeReturn: runResults.tradeReturn,
    points: calculateRatingPoints(runResults),
  };
}

function calculateRatingPoints({tradeReturn, indexReturn, stockReturn}: RunResults): number {
  let criteria = 0;
  if (tradeReturn > stockReturn) criteria++;
  if (tradeReturn > indexReturn) criteria++;
  if (tradeReturn > 0) criteria++;

  if (criteria === 3) return PLAYLIST_RATING_SCORE.HIGH.POINTS;
  if (criteria === 2) return PLAYLIST_RATING_SCORE.MEDIUM.POINTS;
  if (criteria === 1) return PLAYLIST_RATING_SCORE.LOW.POINTS;
  return PLAYLIST_RATING_SCORE.NO_POINTS.POINTS;
}

export function calculatePlaylistRating(playlist: Playlist) {
  const playlistScore = playlist.reduce(
    (store, {rating}) => {
      if (!rating) return store;

      store.itemsForRating++;
      store.total += rating.points;

      return store;
    },
    {itemsForRating: 0, total: 0},
  );

  const maximumPlaylistScore = PLAYLIST_RATING_SCORE.HIGH.POINTS * playlist.length;
  const notEnoughItemsForRating = playlistScore.itemsForRating < PLAYLIST_MINIMUM_ITEMS_FOR_RATING;

  if (notEnoughItemsForRating) return null;

  return playlistScore.total / maximumPlaylistScore;
}

export const getRatingIconSource = (ratingPoints: number): null | ImageSourcePropType =>
  Object.values(PLAYLIST_RATING_SCORE).find((RATING_SCORE) => RATING_SCORE.POINTS === ratingPoints)?.ICON;
