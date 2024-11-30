import create from 'zustand';

// Define types
interface Node {
    id: string;
    type: string;
    data: { label: string };
    position: { x: number; y: number };
}

interface Edge {
    id: string;
    source: string;
    target: string;
}

interface Store {
    nodes: Node[];
    edges: Edge[];
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
}

// Create Zustand store
const useStore = create<Store>((set) => ({
    nodes: [],
    edges: [],
    setNodes: (nodes) => {
        console.log('Updating nodes:', nodes);
        set(() => ({ nodes }));
    }, // Replace nodes immutably
    setEdges: (edges) => {
        console.log('Updating edges:', edges);
        set(() => ({ edges })); // Replace edges immutably
    }, // Replace edges immutably
}));

export default useStore;