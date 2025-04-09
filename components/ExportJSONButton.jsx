import { useState } from "react";

const ExportJSONButton = ({ pages }) => {
  const [jsonData, setJsonData] = useState(null);

  const handleExport = () => {
    const json = JSON.stringify(pages, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "reltroner-pages.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setJsonData(json);
  };

  return (
    <div className="text-center mt-6">
      <button
        onClick={handleExport}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all"
      >
        Export Pages as JSON
      </button>

      {jsonData && (
        <div className="mt-4 max-w-3xl mx-auto text-left bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-bold mb-2">Preview JSON:</h3>
          <pre className="text-sm whitespace-pre-wrap break-words">
            {jsonData}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ExportJSONButton;
