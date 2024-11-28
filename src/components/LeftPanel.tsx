import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Papa from 'papaparse';
import { NodeType } from "../utils/nodeTypes";
import { setCsvData } from "../redux/csvSlice";
import { storeCsvData } from "../utils/indexDB";
// import { setOutputData } from "../redux/outputSlice";

const LeftPanel: React.FC = () => {
    const dispatch = useDispatch();

    const [csvData, setCsvDataState] = useState<unknown[]>([]);
    const [uploadedFileName, setUploadedFileName] = useState<string>('');

    // Example CSV files to select
    const exampleFiles = [
        { name: 'example1.csv', path: '/path/to/example1.csv' },
        { name: 'example2.csv', path: '/path/to/example2.csv' }
    ];

    type CsvDataType = Record<string, unknown>;

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleNodeSelection = (node: NodeType) => {
        // Logic for adding nodes to the workflow (e.g., drag-and-drop functionality)
        console.log('Selected Node:', node);
        // You can implement further dispatch actions to manage workflow state if necessary
    };

    return (
        <div className="bg-black text-white p-4 w-1/5 h-full border-r-2 border-skyblue h-3/5">
            {/* Select Example CSV Files */}
            <div className="mb-6">
                <h2 className="text-skyblue text-lg font-semibold mb-2 border-b-2 border-skyblue">Select Example CSV Files</h2>
                <ul className="space-y-2">
                    {exampleFiles.map((file) => (
                        <li key={file.name} className="bg-saffron p-2 rounded-md cursor-pointer hover:bg-skyblue transition-colors">
                            <span>{file.name}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Upload CSV File */}
            <div className="mb-6">
                <h2 className="text-skyblue text-lg font-semibold mb-2 border-b-2 border-skyblue">Upload CSV File</h2>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="bg-saffron text-black p-2 rounded-md cursor-pointer w-full"
                />
                {uploadedFileName && <p className="mt-2 text-skyblue">Uploaded: {uploadedFileName}</p>}
            </div>

            {/* Select Node */}
            <div className="mb-6">
                <h2 className="text-skyblue text-lg font-semibold mb-2 border-b-2 border-skyblue">Select Node</h2>
                <div className="space-y-4">
                    {NodeType.map((node) => (
                        <div
                            key={node.name}
                            className="bg-saffron p-4 rounded-md cursor-pointer hover:bg-skyblue transition-colors"
                            onClick={() => handleNodeSelection(node)}
                        >
                            <span>{node.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LeftPanel;