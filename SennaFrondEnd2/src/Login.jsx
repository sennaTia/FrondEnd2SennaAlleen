import React, { useState } from "react";
import { auth, db } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  doc,
  setDoc
} from "firebase/firestore";

function Login({ onLoginSuccess }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "6px 0",
    border: "1px solid #ccc",
    borderRadius: "4px"
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#0095f6",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  };

  // Registreren
  const register = async () => {

    if (!username || !email || !password) {
      alert("Vul alles in.");
      return;
    }

    try {

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      await setDoc(
        doc(db, "users", userCredential.user.uid),
        {
          username: username,
          email: email
        }
      );

      alert("Account aangemaakt!");

    } catch (error) {
      alert(error.message);
    }

  };

  // Inloggen
  const login = async () => {

    try {

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      alert("Ingelogd!");

      onLoginSuccess(userCredential.user.email);

    } catch (error) {
      alert(error.message);
    }

  };

  return (

    <div>

      <input
        style={inputStyle}
        placeholder="Gebruikersnaam"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        style={inputStyle}
        type="email"
        placeholder="E-mailadres"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={inputStyle}
        type="password"
        placeholder="Wachtwoord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        style={buttonStyle}
        onClick={register}
      >
        Registreren
      </button>

      <button
        style={{
          ...buttonStyle,
          backgroundColor: "#333"
        }}
        onClick={login}
      >
        Inloggen
      </button>

    </div>

  );

}

export default Login;