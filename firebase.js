
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBGrHlXS2pDbf-gEwF3h22imEzCf4Z7fas",
  authDomain: "secret-santa-2026-22d1a.firebaseapp.com",
  projectId: "secret-santa-2026-22d1a",
  storageBucket: "secret-santa-2026-22d1a.firebasestorage.app",
  messagingSenderId: "914147938474",
  appId: "1:914147938474:web:e21cc249a958214b9b80d3",
  measurementId: "G-2J4G0GCKPV"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Conectar Firestore
const db = getFirestore(app);

// Consultar una asignación privada
async function obtenerAsignacion(codigo) {
  const referencia = doc(db, "assignments", codigo);
  const resultado = await getDoc(referencia);

  if (!resultado.exists()) {
    throw new Error("No se encontró esta asignación.");
  }

  return resultado.data();
}

export { db, obtenerAsignacion };
