import { useState } from "react";
import { FaArrowRight, FaArrowLeft, FaExclamationCircle } from "react-icons/fa";

const Base64Converter = () => {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const [error, setError] = useState(""); // Error state

  const encodeToBase64 = () => {
    setEncoded(btoa(text)); // Encoding to Base64
    setError(""); // Clear error on new input
  };

  const decodeFromBase64 = () => {
    try {
      setDecoded(atob(encoded)); // Decoding from Base64
      setError(""); // Clear any previous error
    } catch (error) {
      setDecoded("");
      setError("Invalid Base64 string!"); // Show error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Base64 Encoder & Decoder</h2>

      <div className="w-full max-w-md space-y-4">
        {/* Input for Encoding */}
        <div className="flex flex-col">
          <label className="text-gray-300 mb-1">Text to Encode:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
            placeholder="Enter text"
          />
          <button
            onClick={encodeToBase64}
            className="mt-2 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Encode <FaArrowRight className="ml-2" />
          </button>
        </div>

        {/* Encoded Output */}
        {encoded && (
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1">Encoded Base64:</label>
            <input
              type="text"
              value={encoded}
              readOnly
              className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            />
          </div>
        )}

        {/* Input for Decoding */}
        <div className="flex flex-col">
          <label className="text-gray-300 mb-1">Base64 to Decode:</label>
          <input
            type="text"
            value={encoded}
            onChange={(e) => setEncoded(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
            placeholder="Enter Base64 string"
          />
          <button
            onClick={decodeFromBase64}
            className="mt-2 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Decode <FaArrowLeft className="ml-2" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center text-red-500 bg-red-100 p-2 rounded border border-red-500 mt-2">
            <FaExclamationCircle className="mr-2" />
            <span>{error}</span>
          </div>
        )}

        {/* Decoded Output */}
        {decoded && !error && (
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1">Decoded Text:</label>
            <input
              type="text"
              value={decoded}
              readOnly
              className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Base64Converter;
