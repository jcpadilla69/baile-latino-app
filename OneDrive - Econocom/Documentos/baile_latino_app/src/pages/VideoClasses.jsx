// src/pages/VideoClasses.jsx

import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function VideoClasses() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const videosRef = collection(db, "videos");
      const snapshot = await getDocs(videosRef);
      const videoList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVideos(videoList);
    };

    fetchVideos();
  }, []);

  return (
  <div style={{ padding: 20 }}>
    <h2>Clases en vídeo 💃</h2>

    {videos.length === 0 ? (
      <p>No hay vídeos disponibles</p>
    ) : (
      videos.map((video) => (
        <div
          key={video.id}
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            marginBottom: "40px",
            borderBottom: "1px solid #ccc",
            paddingBottom: "20px"
          }}
        >
          <h3>{video.title}</h3>
          <p><strong>Instructor:</strong> {video.Profesor || "No indicado"}</p>
          <p><strong>Estilo:</strong> {video.estilo || "-"} | <strong>Nivel:</strong> {video.Nivel || "-"}</p>

          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
            <iframe
              src={video.url}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                border: "none",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
              }}
            />
          </div>
        </div>
      ))
    )}
  </div>
);
}
