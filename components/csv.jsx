// app/component/csv.jsx
"use client";

import React, { useState } from "react";
import Papa from "papaparse";

export default function CSVDisplay() {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4"
      />

      {data.length > 0 && (
        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead>
            <tr>
              {Object.keys(data[0]).map((header, index) => (
                <th
                  key={index}
                  className="border border-gray-300 bg-gray-100 px-4 py-2"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((value, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
