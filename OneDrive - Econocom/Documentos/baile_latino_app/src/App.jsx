import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import VideoClasses from "./pages/VideoClasses";
import UploadVideo from "./pages/UploadVideo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1 style={{ padding: 20 }}>Bienvenido a Baile Latino App 💃</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<UploadVideo />} />
        <Route path="/clases" element={<VideoClasses />} />
      </Routes>
    </Router>
  );
}

export default App;
