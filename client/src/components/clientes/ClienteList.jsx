import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CLIENTES } from "../../graphql/clientes";

export function ClienteList() {
  const { loading, error, data } = useQuery(GET_CLIENTES);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!!</p>;

  const clientesOrdenados = data.clientes.slice().sort((a, b) => {
    return a.nombre.localeCompare(b.nombre);
  });

  const filteredClients = clientesOrdenados.filter(
    (cliente) =>
      cliente.dni.includes(search) ||
      cliente.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredClients.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const calculateGlobalIndex = (index) => {
    return index + 1 + (currentPage - 1) * itemsPerPage;
  };

  // console.log(data);

  return (
    <div>
      {/* buscador */}
      <input
        type="text"
        placeholder="Buscar por DNI o Nombre"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        {/* Cabecera */}
        <thead>
          <tr>
            <th>Nº</th>
            <th>DNI</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((cliente, index) => (
            <tr key={cliente._id}>
              <td>{calculateGlobalIndex(index)}</td>
              <td>{cliente.dni}</td>
              <td>{cliente.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Paginacion */}
      <div>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>Página {currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= data.clientes.length}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
