export interface Node {
  id: string;
  type: string;
  data: {
    label: string;
    column?: string;
    condition?: string;
    value?: string;
    sortOrder?: string;
  };
  position: { x: number; y: number };
}

export interface CSVRow {
  [key: string]: string | number;
}

export interface Workflow {
  id: string;
  name: string;
  nodes: Node[];
  connections: Edge[];
}

export interface Edge {
  source: string;
  target: string;
}

export type WorkflowState = {
  workflows: Workflow[];
  currentWorkflow: Workflow | null;
};

export type CSVState = {
  data: CSVRow[];
  fileName: string;
};

export type Action =
  | { type: 'ADD_NODE'; payload: Node }
  | { type: 'REMOVE_NODE'; payload: string }
  | { type: 'SET_CSV'; payload: CSVRow[] }
  | { type: 'SET_WORKFLOW'; payload: Workflow };
