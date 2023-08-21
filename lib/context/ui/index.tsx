import React, { ReactNode, createContext, useContext, useState } from 'react';

const initial = {
  newRecieptModlIsOpen: false,
};

interface IUIContext {
  state: {
    newRecieptModlIsOpen: boolean;
  };
  setState: React.Dispatch<
    React.SetStateAction<{
      newRecieptModlIsOpen: boolean;
    }>
  >;
}

const UIContext = createContext<IUIContext | null>(null);

interface IUIContextProvider {
  children: ReactNode;
}

const UIContextProvider: React.FC<IUIContextProvider> = ({ children }) => {
  const [state, setState] = useState(initial);
  const value = { state, setState };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export default UIContextProvider;

export const useUIContext = () => useContext(UIContext);
