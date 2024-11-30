import React from "react";
// import { useDispatch } from "react-redux";
// import Papa from 'papaparse';
import { NodeType } from "../utils/nodeTypes";
// import { setCsvData } from "../redux/csvSlice";
// import { storeCsvData } from "../utils/indexDB";
// import { setOutputData } from "../redux/outputSlice";
import { useDnD } from './DnDContext';

const LeftPanel: React.FC = () => {
    // const dispatch = useDispatch();

    // const [csvData, setCsvDataState] = useState<unknown[]>([]);
    // const [uploadedFileName, setUploadedFileName] = useState<string>('');

    // Example CSV files to select
    // const exampleFiles = [
    //     { name: 'example1.csv', path: '/path/to/example1.csv' },
    //     { name: 'example2.csv', path: '/path/to/example2.csv' }
    // ];

    const {setType, setName} = useDnD();

    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string, nodeName: string): void => {
      setType(nodeType);
      setName(nodeName);
      event.dataTransfer.effectAllowed = 'move';
    };

    // type CsvDataType = Record<string, unknown>;

    // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0];
    //     if (file) {
    //         setUploadedFileName(file.name);

    //         Papa.parse(file, {
    //             complete: (result) => {
    //                 console.log('Parsed CSV Data:', result.data);
    //                 const parsedData = result.data as CsvDataType[];
    //                 setCsvDataState(parsedData);
    //                 dispatch(setCsvData(parsedData)); // Store the parsed data in Redux state
    //                 // dispatch(setOutputData(parsedData))
    //                 storeCsvData(parsedData); // Save it to IndexedDB
    //             },
    //             header: true,
    //         });
    //     }
    //     console.log(csvData)
    // };

    // const handleNodeSelection = (node: NodeType) => {
    //     // Logic for adding nodes to the workflow (e.g., drag-and-drop functionality)
    //     console.log('Selected Node:', node);
    //     // You can implement further dispatch actions to manage workflow state if necessary
    // };

    return (
        <div className="bg-black text-white p-4 w-1/5 h-full border-r-2 border-skyblue">
            {/* Select Example CSV Files */}
            <div className="mb-6">
                <h2 className="text-skyblue text-lg font-semibold mb-2 border-b-2 border-skyblue">Input</h2>
                <div className="space-y-2">
                    <div
                        className="dndnode input bg-saffron p-2 rounded-md cursor-pointer"
                        onDragStart={(event) => onDragStart(event, 'fileInput', 'Select File')}
                        draggable
                    >
                        File
                    </div>
                    <div
                        className="dndnode input bg-saffron p-2 rounded-md cursor-pointer"
                        onDragStart={(event) => onDragStart(event, 'example-data', 'Example Data')}
                        draggable
                    >
                        Example Data
                    </div>
                </div>
            </div>

            {/* Select Node */}
            <div className="mb-6">
                <h2 className="text-skyblue text-lg font-semibold mb-2 border-b-2 border-skyblue">Transform Node</h2>
                <div className="space-y-2">
                    {NodeType.map((node) => (
                        <div
                            key={node.name}
                            className="dndnode input bg-saffron p-2 rounded-md cursor-pointer hover:bg-skyblue transition-colors"
                            onDragStart={(event) => onDragStart(event, node.id, node.name)}
                            draggable
                        >
                            {node.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LeftPanel;