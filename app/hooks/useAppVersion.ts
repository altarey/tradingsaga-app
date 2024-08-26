import {useCallback, useEffect, useState} from 'react';
import {appVersion, getRemoteAppVersion} from '../utils/appVersion';

const useAppVersion = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogShown, setIsDialogShown] = useState(true);
  const [remoteVersion, setRemoteVersion] = useState('0.0.0');
  const [localVersion, setLocalVersion] = useState(appVersion());

  const compareAppVersion = useCallback(async () => {
    const [majorRemote, minorRemote, fixRemote] = remoteVersion.split('.');
    const [majorLocal, minorLocal, fixLocal] = localVersion.split('.');

    function doesNeedToUpdate() {
      if (+majorLocal > +majorRemote) return false;
      if (+minorLocal > +minorRemote) return false;
      if (+fixLocal >= +fixRemote) return false;
      return true;
    }

    const needToUpdate = doesNeedToUpdate();
    setIsDialogShown(needToUpdate);
  }, [localVersion, remoteVersion]);

  const getVersion = async () => {
    const version = await getRemoteAppVersion();

    if (version) setRemoteVersion(version);

    setIsLoading(false);
    setLocalVersion(appVersion());
  };

  useEffect(() => {
    getVersion().then();
  }, []);

  useEffect(() => {
    compareAppVersion().then();
  }, [compareAppVersion, localVersion, remoteVersion]);

  return {appVersionLoading: isLoading, shouldShowUpdateDialog: isDialogShown};
};

export default useAppVersion;
