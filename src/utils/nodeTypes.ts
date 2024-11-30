export interface NodeType {
  name: string;
  id: string;
  description: string;
}

export const NodeType: NodeType[] = [
  { name: 'Filter', id: 'filter', description: 'Filter data based on a condition' },
  { name: 'Sort', id: 'sort', description: 'Sort data based on a column' },
  // { name: 'Group', id: 'group', description: 'Group data based on a column' },
  { name: 'Slice', id: 'slice', description: 'Slice data based on an index' },
  { name: 'Merge', id: 'merge', description: 'Merge two datasets' },
];
