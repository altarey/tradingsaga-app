import HTMLParser from 'fast-html-parser';
import {Logger} from './logger';

async function loadServerTNC(tncTimeUrl: string) {
  try {
    const resp = await fetch(tncTimeUrl, {
      method: 'GET',
    });
    const txt = await resp.text();
    const html = HTMLParser.parse(txt);
    const timeElement = html.querySelector('time');
    if (!(timeElement && timeElement.attributes.dateTime)) {
      Logger.logWarning('No <time dateTime="YYYY-MM-DDTHH:MM:SS-XX:YY"/> tag was found on TNC page');
      return undefined;
    }
    return timeElement.attributes.dateTime;
  } catch (e) {
    Logger.logWarning(`Error while loading and parsing TNC page (${tncTimeUrl})`, e);
  }
  return undefined;
}

export default loadServerTNC;
