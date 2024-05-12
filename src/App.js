import "./App.css";
import { useState } from "react";

const App = () => {
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const executePythonScript = async () => {
    try {
      const response = await fetch("http://localhost:5000/execute-python", {
        method: "POST",
      });
      if (response.ok) {
        const data = await response.json();
        if (data.output) {
          setOutput(data.output);
          setError("");
        } else {
          setError(data.error);
        }
      } else {
        setError("Failed to execute Python script");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to execute Python script");
    }
  };

  return (
    <div>
      <button onClick={executePythonScript}>Execute Python Script</button>
      {output && <pre>{output}</pre>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default App;
