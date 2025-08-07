// src/pages/Login.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (error) {
      alert("Error de login: " + error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/profile");
    } catch (error) {
      alert("Error con Google: " + error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Iniciar sesión</h2>

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 8, marginBottom: 10, display: "block" }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: 8, marginBottom: 10, display: "block" }}
      />

      <button onClick={loginWithEmail} style={{ marginBottom: 10 }}>Entrar</button>
      <br />
      <button onClick={loginWithGoogle}>Entrar con Google</button>
    </div>
  );
}
