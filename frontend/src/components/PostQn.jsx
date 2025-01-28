import React, { useState } from "react";

const PostQn = () => {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!question) {
      setError("Question is required.");
      return;
    }

    // You can handle form data submission here, e.g., call an API or update state.
    console.log("Form submitted:", {question });
    setQuestion("");
    setError("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto",textAlign:"center" }}>
      <h4 style={{marginBottom: "10px" }}>Post your Question</h4>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <textarea
            id="qn"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter question here"
            rows="4"
            style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "#fff",
            padding: "8px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default PostQn;
