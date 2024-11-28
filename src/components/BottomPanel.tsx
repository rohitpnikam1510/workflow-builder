import React from 'react';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { flattenData } from '../utils/helper';

interface BottomPanelProps {
    data: Record<string, unknown>[]; // The dynamic data to display in the table
}

const BottomPanel: React.FC<BottomPanelProps> = ({ data }) => {

    console.log("BottomPanel Data:");
    console.log(data);
    const safeData = data || [];

    const exportToCSV = () => {
        try {
            const flattenedData = flattenData(data);
            const csv = Papa.unparse(flattenedData);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            saveAs(blob, 'output.csv'); // Save the CSV file
        } catch (error) {
            console.error('Error exporting CSV:', error);
        }
    }

    const exportToJSON = () => {
        try {
            const json = JSON.stringify(safeData, null, 2); // Convert data to JSON format
            const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
            saveAs(blob, 'output.json'); // Save the JSON file
        } catch (error) {
            console.error('Error exporting JSON:', error);
        }
    };

    const renderTable = (data: unknown) => {
        console.log("Array.isArray(data): ", Array.isArray(data));
        console.log("Data:");
        console.log(data);



        if (Array.isArray(data) && data.length > 0) {
            return (
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            {Object.keys(data[0]).map((key) => (
                                <th key={key} className="border border-skyblue p-2 text-left text-saffron">
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, idx) => (
                            <tr key={idx}>
                                {Object.keys(row).map((key) => (
                                    <td key={key} className="px-4 py-2 border-b border-skyblue">
                                        {typeof row[key] === 'object' ? (
                                            renderTable([row[key]])  // Recursively render nested objects
                                        ) : (
                                            row[key]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            return <div>No data available</div>;
        }
    };

    return (
        <div className="bg-black p-4 text-white flex flex-col items-start border-t-4 border-skyblue">
            <h3 className="text-xl font-semibold mb-4 text-saffron">Output Data</h3>

            {/* Export Buttons */}
            <div className="mb-4">
                <button
                    onClick={() => exportToCSV()}
                    className="bg-saffron text-black px-4 py-2 rounded mr-2 hover:bg-skyblue"
                >
                    Export as CSV
                </button>
                <button
                    onClick={() => exportToJSON()}
                    className="bg-saffron text-black px-4 py-2 rounded hover:bg-skyblue"
                >
                    Export as JSON
                </button>
            </div>

            {/* Table to display dynamic data */}
            <div className="overflow-x-auto w-full">
                {renderTable(safeData)}
            </div>
        </div>
    );
};

export default BottomPanel;

