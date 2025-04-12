import { useState, useEffect } from "react";

export default function Home() {
  const [salesReps, setSalesReps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 'error' state is defined here
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8000/api/sales-reps");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSalesReps(data.salesReps || []);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch sales reps:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleAskQuestion = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error("Error in AI request:", error);
    }
  };

  if (loading) return <p>Loading sales representative data...</p>;
  if (error) return <p>Error loading sales representative data: {error?.message}</p>; // Access the message property of the 'error' state

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Sales Dashboard</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Sales Representatives</h2>
        {salesReps.map((rep) => (
          <div key={rep.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
            <h3>{rep.name}</h3>
            <p>Role: {rep.role}</p>
            <p>Region: {rep.region}</p>
            <h4>Skills:</h4>
            {rep.skills && rep.skills.length > 0 ? (
              <ul>
                {rep.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p>No skills listed.</p>
            )}
            <h4>Deals:</h4>
            {rep.deals && rep.deals.length > 0 ? (
              <ul>
                {rep.deals.map((deal) => (
                  <li key={deal.client}>
                    <strong>Client: {deal.client}</strong> - Value: ${deal.value} - Status: {deal.status}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No deals assigned.</p>
            )}
            <h4>Clients:</h4>
            {rep.clients && rep.clients.length > 0 ? (
              <ul>
                {rep.clients.map((client) => (
                  <li key={client.name}>
                    <strong>{client.name}</strong> - Industry: {client.industry} - Contact: {client.contact}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No clients listed.</p>
            )}
          </div>
        ))}
      </section>

      <section>
        <h2>Ask a Question (AI Endpoint)</h2>
        <div>
          <input
            type="text"
            placeholder="Enter your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button onClick={handleAskQuestion}>Ask</button>
        </div>
        {answer && (
          <div style={{ marginTop: "1rem" }}>
            <strong>AI Response:</strong> {answer}
          </div>
        )}
      </section>
    </div>
  );
}