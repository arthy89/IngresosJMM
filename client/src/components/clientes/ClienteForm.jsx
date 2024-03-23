import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREAR_CLIENTE, GET_CLIENTES } from "../../graphql/clientes";

export function ClienteForm() {
  const [cliente, setCliente] = useState({
    dni: "",
    nombre: "",
  });

  const [createCliente, { loading, error }] = useMutation(CREAR_CLIENTE, {
    refetchQueries: ["getClientes"],
  });

  // console.log(error);

  const handleChange = ({ target: { name, value } }) => {
    setCliente({
      ...cliente,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCliente({
      variables: {
        dni: cliente.dni,
        nombre: cliente.nombre,
      },
    });

    setCliente({
      dni: "",
      nombre: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="font-bold text-xl mb-2 text-center">Nuevo Cliente</p>

      {error && <p>{error.message}</p>}

      <input
        type="number"
        name="dni"
        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-2"
        placeholder="DNI"
        onInput={(e) => (e.target.value = e.target.value.slice(0, 8))}
        value={cliente.dni}
        onChange={handleChange}
      />

      <input
        type="text"
        name="nombre"
        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-2"
        placeholder="Apellidos y Nombres"
        value={cliente.nombre}
        onChange={handleChange}
      />

      <div className="flex justify-center">
        <button
          disabled={!cliente.dni || !cliente.nombre || loading}
          className="font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
        >
          Guardar Cliente
        </button>
      </div>
    </form>
  );
}
