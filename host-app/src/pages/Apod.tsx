import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import styles from "./Apod.module.css";

const Apod = () => {
  const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;
   const [date, setDate] = useState("")

  const APOD_URL = date?
                  `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`: 
                  `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

  const { data, loading, error } = useFetch(APOD_URL);

 

  useEffect(() => {
    console.log("APOD Data:", data);
  }, [data]);

  if (loading) {
    return <div className={styles.loadingState}>🌌 Loading today's cosmic wonder...</div>;
  }

  if (error) {
    return <div className={styles.errorState}>❌ Error: {error}</div>;
  }

  return (
    <section className={styles.apodPage}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>NASA Explorer</p>
        <h1 className={styles.apodTitle}>Astronomy Picture of the Day</h1>
        <h3 className={styles.apodSubtitle}>{data.title}</h3>

        <div className={styles.controls}>
          <input
            type="date"
            value={date}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className={styles.dateInput}
          />
          <button onClick={() => setDate("")} className={styles.todayButton}>
            Today
          </button>
        </div>
      </div>

     

      <div className={styles.imageContainer}>
        {data.media_type === "image" && (
          <img src={data.url} alt={data.title} className={styles.apodImage} />
        )}

        {data.media_type === "video" && (
          <iframe
            src={data.url}
            title={data.title}
            className={styles.apodImage}
            allowFullScreen
          ></iframe>
        )}

        <div className={styles.dateInfo}>📅 {data.date}</div>
      </div>

      <p className={styles.explanation}>{data.explanation}</p>
    </section>
  );
};

export default Apod;