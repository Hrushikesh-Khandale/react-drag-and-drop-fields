import React, { useState, useEffect } from "react";

function App() {
  const [inputs, setInputs] = useState(["", "", "", "", "", "", ""]);
  const [draggingIndex, setDraggingIndex] = useState(null);

  useEffect(() => {
    const storedInputs = JSON.parse(localStorage.getItem("inputs"));

    if (storedInputs && storedInputs.length === inputs.length) {
      setInputs(storedInputs);
    }
    //eslint-disable-next-line
  }, []);

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
    localStorage.setItem("inputs", JSON.stringify(newInputs));
  };

  const handleClear = () => {
    localStorage.removeItem("inputs");
    setInputs(["", "", "", "", "", "", ""]);
  };

  const handleDragStart = (index) => {
    setDraggingIndex(index);
  };

  const handleDragEnter = (index) => {
    if (index !== draggingIndex) {
      const newInputs = [...inputs];
      const draggedInput = newInputs[draggingIndex];
      newInputs.splice(draggingIndex, 1);
      newInputs.splice(index, 0, draggedInput);
      setInputs(newInputs);
      setDraggingIndex(index);
      localStorage.setItem("inputs", JSON.stringify(newInputs));
    }
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1> Drag & Drop Fields</h1>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {inputs.map((input, index) => (
            <input
              key={index}
              type="text"
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              style={{
                padding: "5px",
                margin: "5px",
                backgroundColor: index === draggingIndex ? "#ccc" : "#eee",
                cursor: "pointer",
                width: "200px",
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <button
          style={{
            padding: "7px 15px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius:'5px',
            boxShadow:'inset -5px 5px 10px blue'
          }}
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </>
  );
}

export default App;
