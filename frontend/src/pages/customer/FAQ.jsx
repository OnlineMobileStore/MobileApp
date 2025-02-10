import React, { useEffect, useState } from "react";
import { getFAQs } from "../../services/faq";
import { toast } from "react-toastify";
import NavbarComponent from "../../components/Navbar";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await getFAQs();
        setFaqs(response.data);
      } catch (err) {
        setError("Failed to load FAQs.");
        toast.error("Failed to load FAQs.");
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <div>
  <NavbarComponent />
  <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
    <h4>Frequently Asked Questions</h4>

    {loading && <p>Loading...</p>}
    {error && <p style={{ color: "red" }}>{error}</p>}

    <div>
      {faqs.length > 0
        ? faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "15px",
                backgroundColor: index % 2 === 0 ? "#d9fcc8" : "#f9f9f9"
              }}
            >
              <h5 style={{ marginBottom: "5px" }}>Q: {faq.question}</h5>
              <div style={{ color: "#555" }}>
                A: {faq.answer || "No answer available."}
              </div>
            </div>
          ))
        : !loading && <p>No FAQs available.</p>}
    </div>
  </div>
</div>

  );
};

export default FAQ;
