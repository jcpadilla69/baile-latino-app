import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import VideoClasses from "./pages/VideoClasses";
import UploadVideo from "./pages/UploadVideo";

function App() {
  return (
    <Router>
      {/* Cabecera con navegación */}
      <header style={{ padding: "1rem", backgroundColor: "#f4f4f4" }}>
        <nav style={{ display: "flex", gap: "1rem" }}>
          <Link to="/">📺 Clases</Link>
          <Link to="/upload">⬆️ Subir vídeo</Link>
        </nav>
      </header>

      {/* Contenido de la app */}
      <Routes>
        <Route path="/" element={<VideoClasses />} />
        <Route path="/upload" element={<UploadVideo />} />
      </Routes>
    </Router>
  );
}

export default App;

