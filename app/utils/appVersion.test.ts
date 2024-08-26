import {getRemoteAppVersion} from './appVersion';
import {versionRegex} from './regex';

describe('appVersion', () => {
  describe('getRemoteAppVersion', () => {
    it('should return valid version or undefined', async () => {
      const version = await getRemoteAppVersion();
      if (version) expect(versionRegex.test(version)).toBeTruthy();
      else expect(version).toBeUndefined();
    });
  });
});
