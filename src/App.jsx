import { TiendaProvider } from "./context/TiendaContext";
import { Routes, Route } from "react-router-dom";
import "./style/app.css";
import { Catalogo } from "./ui/Catalogo";
import { Introduccion } from "./ui/Introduccion";
import { Menu } from "./ui/Menu";
import { ModalCompra } from "./ui/ModalCompra";
import { Success } from "./ui/Success";
import { Failed } from "./ui/Failed";
import { Pending } from "./ui/Pending";

export const App = () => {
  return (
    <section className="app">
      <TiendaProvider>
        <Menu />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Introduccion />
                <Catalogo />
                <ModalCompra />
              </>
            }
          />
          <Route path="/success" element={<Success />} />
          <Route path="/failed" element={<Failed />} />
          <Route path="/pending" element={<Pending />} />
        </Routes>
      </TiendaProvider>
    </section>
  );
};
