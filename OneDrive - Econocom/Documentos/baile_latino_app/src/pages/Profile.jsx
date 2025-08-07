// src/pages/Profile.jsx

import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [style, setStyle] = useState("Salsa");
  const [level, setLevel] = useState("Principiante");

  // Cargar datos desde Firestore
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      const ref = doc(db, "users", user.uid);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name || "");
        setCity(data.city || "");
        setStyle(data.style || "Salsa");
        setLevel(data.level || "Principiante");
      }
    };

    loadProfile();
  }, [user, navigate]);

  // Guardar datos en Firestore
  const saveProfile = async () => {
    if (user) {
      await setDoc(doc(db, "users", user.uid), {
        name,
        city,
        style,
        level,
        email: user.email
      });
      alert("Perfil guardado correctamente");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Perfil de {user?.email}</h2>

      <input
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />
      <input
        placeholder="Ciudad"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <select value={style} onChange={(e) => setStyle(e.target.value)} style={{ display: "block", marginBottom: 10 }}>
        <option>Salsa</option>
        <option>Bachata</option>
        <option>Kizomba</option>
      </select>

      <select value={level} onChange={(e) => setLevel(e.target.value)} style={{ display: "block", marginBottom: 10 }}>
        <option>Principiante</option>
        <option>Intermedio</option>
        <option>Avanzado</option>
      </select>

      <button onClick={saveProfile}>Guardar perfil</button>
    </div>
  );
}
