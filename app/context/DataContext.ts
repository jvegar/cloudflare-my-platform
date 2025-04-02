import type { DataContextType } from '~/types';
import React from 'react';

export const DataContext = React.createContext<DataContextType | undefined>(undefined);
export const useDataContext = () => {
  const context = React.useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataContextProvider');
  }
  return context;
};
