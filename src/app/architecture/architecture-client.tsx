
'use client';

import React from 'react';
import { ReactFlow, Background, Controls, MiniMap, useNodesState, useEdgesState, type Node, type Edge } from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
    {
      id: '1',
      type: 'input',
      data: { label: 'User (Operator)' },
      position: { x: 0, y: 150 },
    },
    {
      id: '2',
      data: { label: 'Next.js Frontend (React Components)' },
      position: { x: 250, y: 150 },
      className: 'w-[200px]'
    },
    {
      id: '3',
      data: { label: 'Next.js Backend (Server Actions)' },
      position: { x: 550, y: 0 },
      className: 'w-[200px]'
    },
    {
        id: '4',
        data: { label: 'Genkit AI Flows' },
        position: { x: 800, y: 0 },
        className: 'w-[200px]'
    },
    {
        id: '5',
        data: { label: 'Google AI (Gemini Pro)' },
        position: { x: 1050, y: 0 },
        className: 'w-[200px]'
    },
    {
        id: '6',
        data: { label: 'Mock Data Service' },
        position: { x: 550, y: 300 },
        className: 'w-[200px]'
    },
  ];
  
  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', label: 'Interacts with UI' },
    { id: 'e2-3', source: '2', target: '3', animated: true, label: 'Calls Server Action' },
    { id: 'e3-4', source: '3', target: '4', animated: true, label: 'Invokes Flow' },
    { id: 'e4-5', source: '4', target: '5', animated: true, label: 'Sends Prompt' },
    { id: 'e2-6', source: '2', target: '6', label: 'Fetches initial data'},
  ];

export function ArchitectureClient() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
