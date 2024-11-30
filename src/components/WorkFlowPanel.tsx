import React, { useRef, useCallback } from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    Controls,
    useReactFlow,
    Background,
    Connection,
} from '@xyflow/react';
import { DnDProvider, useDnD } from './DnDContext';

import LeftPanel from '../components/LeftPanel';
import FileInputNode from './nodeElements/FileInputNode';
import FilterNode from './nodeElements/FilterNode';
import useStore from '../utils/useStore';
import { v4 as uuidv4 } from 'uuid';

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const { screenToFlowPosition } = useReactFlow();
    const { type, name } = useDnD();

    // Zustand store hooks
    const { nodes, edges, setNodes, setEdges } = useStore();

    // Handle new edge connections
    const onConnect = useCallback(
        (params: Connection) => {
            const newEdge = {
                id: uuidv4(),
                source: params.source!,
                target: params.target!,
            };

            setEdges([...edges, newEdge]);
        },
        [edges, setEdges],
    );

    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();

            if (!type) return;

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${name}` },
            };

            setNodes([...nodes, newNode]);
        },
        [nodes, screenToFlowPosition, type, name, setNodes],
    );

    const nodeTypes = {
        fileInput: FileInputNode,
        filter: FilterNode,
    };

    return (
        <div className="dndflow flex w-full h-[100vh]">
            <LeftPanel />
            <div className="reactflow-wrapper flex-1 h-full" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    fitView
                    style={{ backgroundColor: '#F7F9FB' }}
                    nodeTypes={nodeTypes}
                >
                    <Controls style={{ left: 10, bottom: 10 }} />
                    <Background />
                </ReactFlow>
            </div>
        </div>
    );
};

const WorkFlowPanel: React.FC = () => (
    <div className="p-4 w-full h-full flex">
        <ReactFlowProvider>
            <DnDProvider>
                <DnDFlow />
            </DnDProvider>
        </ReactFlowProvider>
    </div>
);

export default WorkFlowPanel;
