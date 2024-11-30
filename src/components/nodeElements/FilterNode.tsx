import React, { useEffect, useState, memo } from 'react';
import { Handle, Position } from 'reactflow';
import { getColumnNames } from '../../utils/helper';

interface FilterNodeProps {
    id: string;
    data: { label: string };
    style?: React.CSSProperties;
    isConnectable?: boolean;
}

const FilterNode: React.FC<FilterNodeProps> = ({ id, data, style, isConnectable = true }) => {
    const [columns, setColumns] = useState<string[]>([]);
    const [selectedColumn, setSelectedColumn] = useState<string>('');
    const [condition, setCondition] = useState<string>('');

    useEffect(() => {
        const fetchColumns = async () => {
            const columnNames = await getColumnNames();
            console.log(columnNames);
            
            setColumns(columnNames);
        };
        fetchColumns();

    }, []);

    const handleColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedColumn(e.target.value);
    const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => setCondition(e.target.value);


    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
            />
            <div
                id={id}
                style={style}
                className="p-4 bg-skyblue rounded-lg shadow-lg border border-black"
            >
                <h4 className="font-bold text-black mb-2">{data.label}</h4>
                <div>
                    <label htmlFor="column">Column:</label>
                    <select
                        id="column"
                        value={selectedColumn}
                        onChange={handleColumnChange}
                        className="mb-2 p-2">
                        <option value="">Select Column</option>
                        {columns.map((col) => (
                            <option key={col} value={col}>
                                {col}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="condition">Condition:</label>
                    <input
                        id="condition"
                        type="text"
                        value={condition}
                        onChange={handleConditionChange}
                        className="mb-2 p-2"
                        placeholder="Enter condition (e.g., 'value > 10')"
                    />
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
            />
        </>
    );
};

export default memo(FilterNode);