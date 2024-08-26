import {Playlist, PlaylistItem} from '../../tickers';
import {percentFormat, percentFormat1} from '../common-utils';
import Colors from '../../config/colors';
import {calculatePlaylistRating} from '../../tickers/playlist/playlistRating';
import moment from 'moment';
import {APP_TITLE} from '../../config/constants';
import TRADING_SAGA_LOGO_BASE_64 from '../../assets/resources/img/trading-saga-logo.base64';

const createPlaylistResultsInHTML = (playlist: Playlist) => {
  const playlistRating = calculatePlaylistRating(playlist);
  return `
    <html lang="en">
      ${HEAD}
      <body>
        ${LOGO}
        <table class="content-table">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Name</th>
              <th>Date Range</th>
              <th>Rating ${playlistRating !== null ? `(${percentFormat(playlistRating)})` : ''}</th>
            </tr>
          </thead>
          <tbody>
            ${playlist.map(createRow).join('')}
          </tbody>
        </table>
      <body>
    </html>
  `;
};

export default createPlaylistResultsInHTML;

const HEAD = `
  <head>
    <style>
      * {
        font-family: sans-serif;
      }
      body {
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        flex-direction: column;
      }

      .logo {
        width: 100%;
        max-width: 280px;
        background-color: #1c7c33;
        padding: 10px;
      }
      .content-table {
        border-collapse: collapse;
        margin: 25px 0;
        font-size: 0.9em;
        min-width: 400px;
        border-radius: 5px 5px 0 0;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
      }

      .content-table thead tr {
        background-color: #1c7c33;
        color: #ffffff;
        text-align: left;
        font-weight: bold;
      }

      .content-table th,
      .content-table td {
        padding: 12px 15px;
      }

      .content-table tbody tr {
        border-bottom: 1px solid #dddddd;
      }

      .content-table tbody tr:nth-of-type(even) {
        background-color: #f3f3f3;
      }

      .content-table tbody tr:last-of-type {
        border-bottom: 2px solid #1c7c33;
      }

      .content-table tbody tr.active-row {
        font-weight: bold;
        color: #1c7c33;
      }
      .positive-number {
        color: ${Colors.FERN.default}
      }
      .negative-number {
        color: ${Colors.INDIAN_RED.default}
      }
    </style>
  </head>
`;

const createRow = (playlistItem: PlaylistItem): string => {
  const {ticker, name, dateRange, rating} = playlistItem;
  const tradeReturn = rating?.tradeReturn ?? null;
  const isPlayed = tradeReturn !== null;
  const ratingText = isPlayed ? percentFormat1(tradeReturn as number) : 'Not played';
  let ratingClass = '';
  if (tradeReturn !== null && tradeReturn > 0) ratingClass += 'positive-number';
  if (tradeReturn !== null && tradeReturn < 0) ratingClass += 'negative-number';
  return `
    <tr>
      <td>${ticker.toUpperCase()}</td>
      <td>${name}</td>
      <td>${formatDate(dateRange.start)} - ${formatDate(dateRange.end)}</td>
      <td class=${ratingClass}>${ratingText}</td>
    </tr>
  `;
};

const formatDate = (date: string) => moment(date).format('MM/DD/YY');

const LOGO =
  '<img class="logo" alt="' + APP_TITLE + '" src="data:image/png;base64,' + TRADING_SAGA_LOGO_BASE_64 + '" />';
