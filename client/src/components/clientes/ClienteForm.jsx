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
      {error && <p>{error.message}</p>}

      <input
        type="text"
        name="dni"
        placeholder="DNI"
        value={cliente.dni}
        onChange={handleChange}
      />

      <input
        type="text"
        name="nombre"
        placeholder="Apellidos y Nombres"
        value={cliente.nombre}
        onChange={handleChange}
      />

      <button disabled={!cliente.dni || !cliente.nombre || loading}>
        Guardar
      </button>
    </form>
  );
}
