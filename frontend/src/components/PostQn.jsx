import React, { useState } from "react";
import { postQuestion } from "../services/faq";
import { toast } from "react-toastify";

const PostQn = () => {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");

  const handlePostQn = async (e) => {
    e.preventDefault();

    if (!question) {
      setError("Question is required.");
      return;
    }
    try {
      const result = await postQuestion(question);
      if(result.data!=null || result.data!=undefined){
      toast.success("Question posted!");
      console.log(result.data);
      setQuestion("");
      setError("");
    }
    } catch (error) {
      toast.error("Error posting question");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h4 style={{ marginBottom: "10px" }}>Post your Question</h4>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      <form onSubmit={handlePostQn}>
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
