import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import uuid from 'react-native-uuid';

type RenderGetDialog = (unmount: () => void) => React.ReactElement;

interface RenderReturn {
  unmount: () => void;
  id: string;
}

interface RenderConfig {
  customId: string;
}

export interface UseDialogsReturn {
  unmount: (dialogId: string) => void;
  render: (getDialog: RenderGetDialog, config?: RenderConfig) => RenderReturn;
  isDialogIdTaken: (dialogId: string) => boolean;
}

const DialogsContext = createContext<UseDialogsReturn>(undefined!);

interface Dialog {
  id: string;
  Dialog: () => React.ReactElement;
}

export const DialogsProvider: React.FC = ({children}) => {
  const [dialogs, setDialogs] = useState<Dialog[]>([]);

  const unmount = useCallback(
    (dialogId) => {
      setDialogs((previousDialogs) => previousDialogs.filter((dialog) => dialog.id !== dialogId));
    },
    [setDialogs],
  );

  const render = useCallback(
    (getDialog: RenderGetDialog, config?: RenderConfig) => {
      const id = config?.customId || `${uuid.v4()}`;
      const unmountCurrentDialog = () => unmount(id);

      const newDialog: Dialog = {
        Dialog: () => getDialog(unmountCurrentDialog),
        id,
      };

      setDialogs((previousDialogs) => {
        if (!previousDialogs.find((dialog) => dialog.id === id)) return [...previousDialogs, newDialog];
        return previousDialogs.map((dialog) => (dialog.id === id ? newDialog : dialog));
      });

      return {
        unmount: unmountCurrentDialog,
        id,
      };
    },
    [unmount, setDialogs],
  );

  const isDialogIdTaken = useCallback(
    (dialogId: string) => !!dialogs.find((dialog) => dialog.id === dialogId),
    [dialogs],
  );

  const value = useMemo(
    () => ({
      unmount,
      render,
      isDialogIdTaken,
    }),
    [unmount, render, isDialogIdTaken],
  );

  return (
    <DialogsContext.Provider value={value}>
      {children}
      {dialogs.map(({Dialog, id}) => (
        <Dialog key={id} />
      ))}
    </DialogsContext.Provider>
  );
};

export const useDialogs = () => {
  const value = useContext(DialogsContext);

  if (!value) throw 'useDialogs must be used within a DialogsProvider';

  return value;
};
