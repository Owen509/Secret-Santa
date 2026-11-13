
import { obtenerAsignacion } from "./firebase.js";

const status = document.getElementById("status");
const participant = document.getElementById("participant");
const revealButton = document.getElementById("revealButton");
const result = document.getElementById("result");
const recipient = document.getElementById("recipient");

// Obtener el código privado de la URL
const parametros = new URLSearchParams(window.location.search);
const token = parametros.get("token");

let asignacion = null;

// Consultar únicamente el documento correspondiente al código
async function cargarAsignacion() {

    if (!token || !/^[a-f0-9]{64}$/.test(token)) {
        status.textContent = "Este enlace no es válido.";
        return;
    }

    try {
        status.textContent = "Buscando tu asignación...";

        asignacion = await obtenerAsignacion(token);

        if (
            !asignacion ||
            typeof asignacion.participant !== "string" ||
            typeof asignacion.recipient !== "string"
        ) {
            throw new Error("Asignación inválida.");
        }

        participant.textContent = `Hola, ${asignacion.participant}`;

        status.textContent = "Tu sorpresa está preparada.";

        revealButton.hidden = false;

    } catch (error) {
        console.error("Error al consultar la asignación.");

        status.textContent =
            "No pudimos encontrar tu asignación. Revisa tu enlace.";
    }
}

// Revelar el resultado
revealButton.addEventListener("click", () => {

    if (!asignacion) return;

    recipient.textContent = asignacion.recipient;

    result.hidden = false;
    revealButton.hidden = true;

    status.textContent = "¡Tu amigo secreto está listo!";
});

// Iniciar
cargarAsignacion();
