import { useReducer } from 'react';
import { WorkflowState, Action, Workflow, Node, Edge } from '../types/types';

const workflowReducer = (state: WorkflowState, action: Action): WorkflowState => {
  switch (action.type) {
    case 'ADD_NODE':
      return {
        ...state,
        currentWorkflow: {
          ...state.currentWorkflow!,
          nodes: [...state.currentWorkflow!.nodes, action.payload],
        },
      };
    case 'REMOVE_NODE':
      return {
        ...state,
        currentWorkflow: {
          ...state.currentWorkflow!,
          nodes: state.currentWorkflow!.nodes.filter((node) => node.id !== action.payload),
        },
      };
    case 'SET_WORKFLOW':
      return {
        ...state,
        currentWorkflow: action.payload,
      };
    default:
      return state;
  }
};

export const useWorkflow = () => {
  const [state, dispatch] = useReducer(workflowReducer, { workflows: [], currentWorkflow: null });

  const addNode = (node: Node) => {
    dispatch({ type: 'ADD_NODE', payload: node });
  };

  const removeNode = (nodeId: string) => {
    dispatch({ type: 'REMOVE_NODE', payload: nodeId });
  };

  const setWorkflow = (workflow: Workflow) => {
    dispatch({ type: 'SET_WORKFLOW', payload: workflow });
  };

  return { state, addNode, removeNode, setWorkflow };
};
