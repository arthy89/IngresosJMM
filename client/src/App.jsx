import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Recibos } from "./pages/Recibos";
import { ReciboDetalles } from "./pages/ReciboDetalles";
import { ReciboCrear } from "./pages/ReciboCrear";
import { Clientes } from "./pages/Clientes";
import { ClienteDetalles } from "./pages/ClienteDetalles";
import { Cuentas } from "./pages/Cuentas";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/recibos" />} />
          <Route path="/recibos" element={<Recibos />} />
          <Route path="/recibos/nuevo" element={<ReciboCrear />} />
          <Route path="/recibos/:id" element={<ReciboDetalles />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/:id" element={<ClienteDetalles />} />
          <Route path="/cuentas" element={<Cuentas />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
