import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Define the type for the context value
type DnDContextType = [string | null, Dispatch<SetStateAction<string | null>>];

// Create a context with default value
const DnDContext = createContext<DnDContextType | undefined>(undefined);

interface DnDProviderProps {
  children: ReactNode;
}

export const DnDProvider: React.FC<DnDProviderProps> = ({ children }) => {
  const [type, setType] = useState<string | null>(null);

  return <DnDContext.Provider value={[type, setType]}>{children}</DnDContext.Provider>;
};

export default DnDContext;

export const useDnD = (): DnDContextType => {
  const context = useContext(DnDContext);
  if (!context) {
    throw new Error('useDnD must be used within a DnDProvider');
  }
  return context;
};
