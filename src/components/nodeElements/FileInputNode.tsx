import React, { useState } from 'react';
import Papa from 'papaparse';
import { useDispatch } from "react-redux";
import { setCsvData } from "../../redux/csvSlice";
import { storeCsvData } from "../../utils/indexDB";
// import { setOutputData } from "../redux/outputSlice";
import { Handle, Position } from '@xyflow/react';

// Define the type for the node props
interface FileInputNodeProps {
    id: string; // ID of the node, usually a string
    data: { label: string }; // Data associated with the node, like a label
    selected?: boolean; // Boolean indicating whether the node is selected
    style?: React.CSSProperties; // Optional styling for the node
    isConnectable: boolean;  
}

const FileInputNode: React.FC<FileInputNodeProps> = ({ id, data, style, isConnectable = true }) => {
    const dispatch = useDispatch();

    const [csvData, setCsvDataState] = useState<unknown[]>([]);
    const [uploadedFileName, setUploadedFileName] = useState<string>('');
    type CsvDataType = Record<string, unknown>;

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedFileName(file.name);

            Papa.parse(file, {
                complete: (result) => {
                    console.log('Parsed CSV Data:', result.data);
                    const parsedData = result.data as CsvDataType[];
                    setCsvDataState(parsedData);
                    dispatch(setCsvData(parsedData)); // Store the parsed data in Redux state
                    // dispatch(setOutputData(parsedData))
                    storeCsvData(parsedData); // Save it to IndexedDB
                },
                header: true,
            });
        }
        console.log(csvData)
    };

    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
                id="TargetA"
            />
            <div
                id={id}
                style={style}
                className="p-4 bg-skyblue rounded-lg shadow-lg border border-black"
            >
                <h4 className="font-bold text-black mb-2">{data.label}</h4>
                <input type="file" onChange={handleFileChange} className="mb-2 p-2" />
                {uploadedFileName && (
                    <div className="mt-2">
                        <h5 className="font-semibold">Data Preview:</h5>
                        <pre>{uploadedFileName}</pre>
                    </div>
                )}
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="SourceB"
                isConnectable={isConnectable}
            />
        </>
    );
};

export default FileInputNode;
