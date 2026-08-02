import { useState, useRef, useEffect } from "react";
import "../chatbot/chatbot.css";
import { createPortal } from "react-dom";

export const Chatbot = ({ open, onClose }) => {
  const [mensajes, setMensajes] = useState([]);
  const [inputChat, setInputChat] = useState("");
  const mensajesEndRef = useRef(null);
  const inputChatRef = useRef(null);

  useEffect(() => {
    mensajesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  useEffect(() => {
    if (open) inputChatRef.current?.focus();
  }, [open]);

  const enviarMensaje = async () => {
    if (!inputChat.trim()) return;

    setMensajes((prev) => [...prev, { role: "user", texto: inputChat }]);
    setInputChat("");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/chatbot`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: inputChat }),
      }
    );

    const data = await response.json();
    setMensajes((prev) => [...prev, { role: "bot", texto: data.respuesta }]);
  };
useEffect(() => {
  const viewport = window.visualViewport;
  if (!viewport) return;

  const ajustar = () => {
    const chatbot = document.querySelector('.chatbot--active');
    if (!chatbot) return;
    chatbot.style.height = `${viewport.height}px`;
    chatbot.style.top = `${viewport.offsetTop}px`;
  };

  viewport.addEventListener('resize', ajustar);
  viewport.addEventListener('scroll', ajustar);

  return () => {
    viewport.removeEventListener('resize', ajustar);
    viewport.removeEventListener('scroll', ajustar);
  };
}, [open]);
useEffect(() => {
  if (open) {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
  } else {
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  }

  return () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
  };
}, [open]);
  return createPortal (
    <div className={`chatbot ${open ? "chatbot--active" : ""}`}>
      <div className="chatbot__header">
        <span
          className="material-symbols-outlined"
          onClick={onClose}
        >
          close
        </span>
      </div>
      <div className="chatbot__mensajes">
        {mensajes.length === 0 && (
          <p className="chatbot__introduccion">
            👋 Hola, puedo ayudarte con:<br />
            Precios · Envíos · Talles · Colores
          </p>
        )}
        {mensajes.map((msg, i) => (
          <div key={i} className={`chatbot__mensaje chatbot__mensaje--${msg.role}`}>
            <p>{msg.texto}</p>
          </div>
        ))}
        <div ref={mensajesEndRef} />
      </div>
      <div className="chatbot__input-cont">
        <input
          ref={inputChatRef}
          type="text"
          value={inputChat}
          placeholder="Escribe tu consulta..."
          className="chatbot__input"
          onChange={(e) => setInputChat(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
        />
        <button className="chatbot__btn-enviar" onMouseDown={(e) => e.preventDefault()} onClick={enviarMensaje}>➤</button>
      </div>
    </div>,
     document.body
  );
};