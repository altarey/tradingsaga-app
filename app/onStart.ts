/**
 * Allows other modules to register startup logic, these functions invoked during splash screen
 * @typedef {(()=>Promise<void>)|(()=>void)} OnStartCallback
 * @type {OnStartCallback[]}
 */
import {loadTutorialPlaylistItemToStorage} from './tickers/tutorialPlaylistItem';
import AppSound from './utils/appSound';
import {ensurePlaylistInitialized} from './tickers';
import {configureAdmob} from './utils/admob';
import * as Iaphub from './utils/IapHub';

export const onStart: (() => void)[] = [];

onStart.push(Iaphub.init);
onStart.push(loadTutorialPlaylistItemToStorage);
onStart.push(AppSound.init);
onStart.push(ensurePlaylistInitialized);
onStart.push(configureAdmob);
