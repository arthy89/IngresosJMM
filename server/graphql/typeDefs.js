// npm i graphql-tag
import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    hello: String
    cliente(_id: ID!): Cliente
    clientes: [Cliente]
    recibo(_id: ID!): Recibo
    recibos: [Recibo]
    item(_id: ID!): Item
    items: [Item]
    detalle(_id: ID!): Detalle
    detalles: [Detalle]
  }

  # Definicion de las mutaciones
  # Int o Float para Number o Decimal128
  type Mutation {
    # clientes
    createCliente(dni: Int!, nombre: String!): Cliente
    deleteCliente(_id: ID!): Cliente
    updateCliente(_id: ID!, dni: Int, nombre: String!): Cliente
    # recibos
    createRecibo(numero: Int, clienteId: ID!, sub_total: Float!): Recibo
    deleteRecibo(_id: ID!): Recibo
    updateRecibo(_id: ID!, clienteId: ID, sub_total: Float): Recibo
    # items
    createItem(descripcion: String!, p_unit: Float!): Item
    deleteItem(_id: ID!): Item
    updateItem(_id: ID!, descripcion: String!, p_unit: Float): Item
    # detalles
    createDetalle(
      reciboId: ID!
      descripcion: String!
      p_unit: Float!
      cantidad: Int!
      p_total: Float!
    ): Detalle
    deleteDetalle(_id: ID!): Detalle
    updateDetalle(
      _id: ID!
      descripcion: String
      p_unit: Float
      cantidad: Int
      p_total: Float
    ): Detalle
  }

  # Definimos el tipo de dato Cliente u otros
  type Cliente {
    _id: ID
    dni: Int
    nombre: String
    createdAt: String
    updatedAt: String
    recibos: [Recibo] # para devolver la lista de recibos
  }

  type Recibo {
    _id: ID
    numero: Int
    cliente: Cliente # retornar el cliente a quien pertenece el recibo
    sub_total: Float
    createdAt: String
    updatedAt: String
    detalles: [Detalle] # devolver el arreglo de detalles
  }

  type Item {
    _id: ID
    descripcion: String
    p_unit: Float
    createdAt: String
    updatedAt: String
  }

  type Detalle {
    _id: ID
    reciboId: ID
    descripcion: String
    p_unit: Float
    cantidad: Int
    p_total: Float
    createdAt: String
    updatedAt: String
  }
`;
