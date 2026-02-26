"use client";

import { createContext, useContext, useState } from "react";

const EnterContext = createContext(null);

export function EnterProvider({ children, preloaderEnabled = false }) {
  const [hasEntered, setHasEntered] = useState(!preloaderEnabled);

  return (
    <EnterContext.Provider value={{ hasEntered, setHasEntered }}>
      {children}
    </EnterContext.Provider>
  );
}

export function useEnter() {
  const ctx = useContext(EnterContext);
  return ctx ?? { hasEntered: true, setHasEntered: () => {} };
}
