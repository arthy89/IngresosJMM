import { ClienteList } from "../components/clientes/ClienteList";
import { ClienteForm } from "../components/clientes/ClienteForm";

export function Clientes() {
  return (
    <div>
      <h1>Clientes</h1>
      <div>
        <ClienteForm />
        <ClienteList />
      </div>
    </div>
  );
}
