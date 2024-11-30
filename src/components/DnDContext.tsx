import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the context value
// type DnDContextType = [string | null, Dispatch<SetStateAction<string | null>>];
type DnDContextType = {
	type: string | null;
	setType: React.Dispatch<React.SetStateAction<string | null>>;
	name: string | null;
	setName: React.Dispatch<React.SetStateAction<string | null>>;
};


// Create a context with default value
const DnDContext = createContext<DnDContextType | undefined>(undefined);

interface DnDProviderProps {
	children: ReactNode;
}

export const DnDProvider: React.FC<DnDProviderProps> = ({ children }) => {
	const [type, setType] = useState<string | null>(null);
	const [name, setName] = useState<string | null>(null);

	const value = {
		type,
		setType,
		name,
		setName,
	};

	return <DnDContext.Provider value={value}>{children}</DnDContext.Provider>;
};

export default DnDContext;

export const useDnD = (): DnDContextType => {
	const context = useContext(DnDContext);
	if (!context) {
		throw new Error('useDnD must be used within a DnDProvider');
	}
	return context;
};
