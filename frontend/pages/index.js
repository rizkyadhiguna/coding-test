import { useState, useEffect } from "react";
import styles from '../styles/Home.module.css';

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

  if (loading) return <p className={styles.loading}>Loading sales representative data...</p>;
  if (error) return <p className={styles.error}>Error loading sales representative data: {error?.message}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Sales Dashboard</h1>

      <section className={styles.section}>
        <h2 className={styles.heading3}>Sales Representatives</h2>
        {salesReps.map((rep) => (
          <div key={rep.id} className={styles.repCard}>
            <h3 className={styles.heading3}>{rep.name}</h3>
            <p>Role: {rep.role}</p>
            <p>Region: {rep.region}</p>
            <h4 className={styles.heading4}>Skills:</h4>
            {rep.skills && rep.skills.length > 0 ? (
              <ul className={styles.list}>
                {rep.skills.map((skill, index) => (
                  <li key={index} className={styles.listItem}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p>No skills listed.</p>
            )}
            <h4 className={styles.heading4}>Deals:</h4>
            {rep.deals && rep.deals.length > 0 ? (
              <ul className={styles.list}>
                {rep.deals.map((deal) => (
                  <li key={deal.client} className={styles.listItem}>
                    <strong>Client: {deal.client}</strong> - Value: ${deal.value} - Status: {deal.status}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No deals assigned.</p>
            )}
            <h4 className={styles.heading4}>Clients:</h4>
            {rep.clients && rep.clients.length > 0 ? (
              <ul className={styles.list}>
                {rep.clients.map((client) => (
                  <li key={client.name} className={styles.listItem}>
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

      <section className={styles.section}>
        <h2 className={styles.heading3}>Ask a Question (AI Endpoint)</h2>
        <div>
          <input
            type="text"
            placeholder="Enter your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleAskQuestion} className={styles.button}>Ask</button>
        </div>
        {answer && (
          <div className={styles.answer}>
            <strong>AI Response:</strong> {answer}
          </div>
        )}
      </section>
    </div>
  );
}