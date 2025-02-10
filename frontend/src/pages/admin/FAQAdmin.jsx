import AdminNavbar from "../../components/AdminNavbar";
import React, { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import { getFAQs, updateAnswer } from "../../services/faq";
import { toast } from "react-toastify";

const FAQAdmin = () => {
  const [faqs, setFaqs] = useState([]); // Fix: Store FAQs as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState({}); // Fix: Track answers separately

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await getFAQs();
        setFaqs(response.data); // Fix: Set FAQs correctly
      } catch (err) {
        setError("Failed to load FAQs.");
        toast.error("Failed to load FAQs.");
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const handleAnswerChange = (id, value) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [id]: value }));
  };

  const handleAnswerSubmit = async (question, id) => {
    if (answers[id] === "") {
      toast.error("Please enter an answer.");
      return;
    }

    try {
      const response = await updateAnswer(id, {
        question: question,
        answer: answers[id],
      });

      if (response.data.status !== "error") {
        toast.success("Answer updated!");

        // Update local state to reflect the new answer
        setFaqs((prevFaqs) =>
          prevFaqs.map((faq) =>
            faq.id === id ? { ...faq, answer: answers[id] } : faq
          )
        );

        setAnswers((prevAnswers) => ({ ...prevAnswers, [id]: "" })); // Clear input after update
      } else {
        toast.error("Answer not updated");
      }
    } catch (err) {
      setError("Failed to update answer.");
      toast.error("Failed to update answer.");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflowY: "auto" }}>
      <div
        style={{
          width: "250px",
          backgroundColor: "#135474",
          color: "#fff",
          position: "fixed",
          top: "0",
          bottom: "0",
          overflowY: "auto",
        }}
      >
        <AdminNavbar />
      </div>
      <div>
        <TopBar />
      </div>
      <div style={{ padding: "20px", width: "55%", margin: "50px auto" }}>
        <h4>Frequently Asked Questions</h4>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div>
          {faqs.length > 0
            ? faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "15px",
                    backgroundColor: index % 2 === 0 ? "#b0e0f8" : "#f9f9f9",
                  }}
                >
                  <h5 style={{ marginBottom: "5px" }}>Q: {faq.question}</h5>
                  <div style={{ color: "#555", marginBottom: "5px" }}>
                    A: {faq.answer || "No answer available."}
                  </div>
                  <div>
                    <input
                      type="text"
                      value={answers[faq.id] || ""}
                      onChange={(e) =>
                        handleAnswerChange(faq.id, e.target.value)
                      }
                      placeholder="Enter your answer"
                      style={{
                        padding: "5px",
                        width: "80%",
                        marginRight: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                    />
                    <button
                      onClick={() => handleAnswerSubmit(faq.question, faq.id)}
                      style={{
                        backgroundColor: "#0695dc",
                        color: "#fff",
                        padding: "5px 10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Add Answer
                    </button>
                  </div>
                </div>
              ))
            : !loading && <p>No FAQs available.</p>}
        </div>
      </div>
    </div>
  );
};

export default FAQAdmin;
