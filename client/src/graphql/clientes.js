import { gql } from "@apollo/client";

export const GET_CLIENTES = gql`
  query getClientes {
    clientes {
      _id
      dni
      nombre
    }
  }
`;

export const CREAR_CLIENTE = gql`
  mutation ($dni: String!, $nombre: String!) {
    createCliente(dni: $dni, nombre: $nombre) {
      _id
      dni
      nombre
    }
  }
`;
