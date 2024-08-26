import {getStorybookUI, configure} from '@storybook/react-native';
import asyncStorage from '@react-native-community/async-storage';
// TODO: Try to migrate this file to TypeScript
// @ts-ignore
import storiesModules from 'glob:../../**/*.stories?(.js|.ts|.tsx|.jsx)';
// @ts-ignore
import storyModules from 'glob:../../**/*.story?(.js|.ts|.tsx|.jsx)'; //'glob:../../**/*.stor(y|ies)?(.js|.ts|.tsx|.jsx)' - didn't work

import './rn-addons';
import {Logger} from 'app/utils/logger';

const allStoryModules = {...storiesModules, ...storyModules};

Logger.logMessage('LOADED STORIES MODULES:', true, Object.entries(allStoryModules));

// eslint-disable-next-line no-unused-vars
let configuredStories;

configure(() => {
  if (allStoryModules instanceof Object)
    configuredStories = Object.entries(allStoryModules)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .filter(([stFile, st]) => {
        const isStoriesFunc = st instanceof Function;
        if (!isStoriesFunc) {
          Logger.logWarning(
            `=== STORIES === ${stFile} does not export default Function configuring stories in it (storiesOf)`,
          );
        } else {
          Logger.logMessage('=== STORIES === registering story ' + stFile);
        }
        return isStoriesFunc;
      })
      .map(([, st]) => typeof st === 'function' && st());
  /* Each *.stories.tsx module must
        export default function(){
          storyOf(...)
        }
      */
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  shouldPersistSelection: true,
  tabOpen: -1,
  // @ts-ignore
  asyncStorage: asyncStorage || null,
  disableWebsockets: true,
});

// If you are using React Native vanilla write your app name here.
// If you use Expo you can safely remove this line.
// AppRegistry.registerComponent(appName, () => StorybookUIRoot);

export default StorybookUIRoot;
