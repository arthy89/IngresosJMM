import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CLIENTES } from "../../graphql/clientes";

export function ClienteList() {
  const { loading, error, data } = useQuery(GET_CLIENTES);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      <div className="grid gap-6 mb-2 md:grid-cols-2">
        <input
          type="text"
          className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="Buscar por DNI o Nombre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-md text-left rtl:text-right text-gray-400">
          {/* Cabecera */}
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="py-2 text-center">
                Nº
              </th>
              <th scope="col" className="px-3 py-2">
                DNI
              </th>
              <th scope="col" className="px-6 py-2">
                Nombre
              </th>
              <th scope="col" className="px-2 py-2">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((cliente, index) => (
              <tr
                key={cliente._id}
                className="odd:bg-gray-900 even:bg-gray-800 bg-gray-50bg-gray-800 border-b border-gray-700"
              >
                <td className="py-2 font-medium whitespace-nowrap text-center">
                  {calculateGlobalIndex(index)}
                </td>
                <td className="px-3 py-2">{cliente.dni}</td>
                <td className="px-6 py-2">{cliente.nombre}</td>
                <td className="px-2 py-2">Acciones</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginacion */}
      <div className="mt-2">
        <button
          className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="text-lg px-2 font-extrabold"> {currentPage}</span>
        <button
          className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= data.clientes.length}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
