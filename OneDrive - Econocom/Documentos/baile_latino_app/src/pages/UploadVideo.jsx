import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const UploadVideo = () => {
  const [videoData, setVideoData] = useState({
    titulo: "",
    profesor: "",
    estilo: "",
    nivel: "",
    urlOriginal: "",
    url: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si está escribiendo en el campo urlOriginal, generamos el embed URL
    if (name === "urlOriginal") {
      const embedUrl = transformYoutubeUrl(value);
      setVideoData((prevData) => ({
        ...prevData,
        urlOriginal: value,
        url: embedUrl
      }));
    } else {
      setVideoData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const transformYoutubeUrl = (url) => {
    try {
      const videoIdMatch = url.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
      );
      if (videoIdMatch && videoIdMatch[1]) {
        return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
      }
    } catch (err) {
      return "";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "videos"), {
        Titulo: videoData.titulo,
        Profesor: videoData.profesor,
        estilo: videoData.estilo,
        Nivel: videoData.nivel,
        url: videoData.url
      });

      alert("✅ ¡Vídeo subido correctamente!");
      setVideoData({
        titulo: "",
        profesor: "",
        estilo: "",
        nivel: "",
        urlOriginal: "",
        url: ""
      });
    } catch (err) {
      console.error("❌ Error al subir:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Subir nuevo vídeo</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "500px" }}>
        <input
          type="text"
          name="titulo"
          value={videoData.titulo}
          onChange={handleChange}
          placeholder="Título del vídeo"
          required
        />
        <input
          type="text"
          name="profesor"
          value={videoData.profesor}
          onChange={handleChange}
          placeholder="Nombre del instructor"
          required
        />
        <input
          type="text"
          name="estilo"
          value={videoData.estilo}
          onChange={handleChange}
          placeholder="Estilo (salsa, bachata...)"
          required
        />
        <input
          type="text"
          name="nivel"
          value={videoData.nivel}
          onChange={handleChange}
          placeholder="Nivel (principiante, intermedio, etc.)"
          required
        />
        <input
          type="text"
          name="urlOriginal"
          value={videoData.urlOriginal}
          onChange={handleChange}
          placeholder="Pega la URL de YouTube aquí"
          required
        />

        {/* Campo oculto para mostrar la URL generada */}
        {videoData.url && (
          <div style={{ fontSize: "0.9rem", color: "#333" }}>
            <strong>Embed URL:</strong> {videoData.url}
          </div>
        )}

        <button type="submit">Subir vídeo</button>
      </form>
    </div>
  );
};

export default UploadVideo;
