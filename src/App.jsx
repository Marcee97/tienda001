import { TiendaProvider } from "./context/TiendaContext";
import { Routes, Route } from "react-router-dom";
import "./style/app.css";
import { Menu } from "./ui/Menu";
import { ModalCompra } from "./ui/ModalCompra";
import { Success } from "./components/Success/Success";
import { Failed } from "./ui/Failed";
import { Pending } from "./ui/Pending";
import { Welcome } from "./ui/Welcome";
import { ModalEnvio } from "./ui/ModalEnvio";
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
              <Welcome />
                <ModalCompra />
                <ModalEnvio />
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
