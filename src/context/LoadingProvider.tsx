import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// Types
interface TLoadingContext {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// Context
const LoadingContext = createContext<TLoadingContext>({
  isLoading: true,
  setIsLoading: () => {},
});

// Hook
export const useLoading = () => useContext(LoadingContext);

// Provider
const LoadingProvider = React.memo(({ children }: { children: ReactNode }): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
});

LoadingProvider.displayName = "LoadingProvider";

export { LoadingProvider };
