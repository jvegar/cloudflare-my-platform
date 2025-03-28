import { createContext, useContext } from "react";

interface ScrollSpyContextType {
  activeSection: string | undefined;
}

export const ScrollSpyContext = createContext<ScrollSpyContextType>({
  activeSection: undefined,
});

export const useScrollSpyContext = () => {
  const context = useContext(ScrollSpyContext);
  if (context === undefined) {
    throw new Error(
      "useScrollSpyContext must be used within a ScrollSpyProvider"
    );
  }
  return context;
};
