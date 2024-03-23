import { ClienteList } from "../components/clientes/ClienteList";
import { ClienteForm } from "../components/clientes/ClienteForm";

export function Clientes() {
  return (
    <div className="px-5">
      <h1 className="text-4xl font-bold text-center py-6">Clientes</h1>
      <div className="grid gap-4 grid-cols-3">
        <div className="col-span-2">
          <ClienteList />
        </div>
        <ClienteForm />
      </div>
    </div>
  );
}
