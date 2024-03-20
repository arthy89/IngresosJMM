import Cliente from "../models/Cliente.js";
import Recibo from "../models/Recibo.js";
import Item from "../models/Item.js";
import Detalle from "../models/Detalle.js";

export const resolvers = {
  Query: {
    hello: () => "Hola mundo",
    cliente: async (_, { _id }) => await Cliente.findById(_id),
    clientes: async () => await Cliente.find(),
    recibo: async (_, { _id }) => await Recibo.findById(_id),
    recibos: async () => await Recibo.find(),
    item: async (_, { _id }) => await Item.findById(_id),
    items: async () => await Item.find(),
    detalle: async (_, { _id }) => await Detalle.findById(_id),
    detalles: async () => await Detalle.find(),
  },

  // Para crear, eliminar, editar
  Mutation: {
    //* Clientes
    createCliente: async (_, { dni, nombre }) => {
      const cliente = new Cliente({
        dni,
        nombre,
      });
      const savedCliente = await cliente.save();
      return savedCliente;
    },

    deleteCliente: async (_, { _id }) => {
      const deletedCliente = await Cliente.findByIdAndDelete(_id);
      // const deletedCliente = await Cliente.findById(_id);
      if (!deletedCliente) throw new Error("Cliente no existe");

      // ! Eliminar los recibos->detalles(muchos)
      const recibosList = await Recibo.find({ clienteId: deletedCliente._id });

      // Promise all para que se ejecute todo
      await Promise.all(
        recibosList.map(async (recibo) => {
          const deletedRecibo = await Recibo.findByIdAndDelete(recibo._id);
          // ! Eliminando detalles
          await Detalle.deleteMany({ reciboId: deletedRecibo._id });
        })
      );

      return deletedCliente;
    },

    updateCliente: async (_, args) => {
      const updatedCliente = await Cliente.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      if (!updatedCliente) throw new Error("Cliente no existe");
      return updatedCliente;
    },

    //* Recibos
    createRecibo: async (_, { clienteId, sub_total }) => {
      const clienteFount = await Cliente.findById(clienteId);
      if (!clienteFount) throw new Error("Cliente no existe");

      // consultar el mayor numero del recibo
      const maxNumRecibo = await Recibo.findOne(
        {},
        {},
        { sort: { numero: -1 } }
      );

      let nextNum = 1;

      if (maxNumRecibo) {
        nextNum = maxNumRecibo.numero + 1;
      }

      const recibo = new Recibo({
        numero: nextNum,
        clienteId,
        sub_total,
      });
      const savedRecibo = await recibo.save();
      return savedRecibo;
    },

    deleteRecibo: async (_, { _id }) => {
      const deletedRecibo = await Recibo.findByIdAndDelete(_id);
      if (!deletedRecibo) throw new Error("Recibo no existe");

      // ! Eliminar los detalles del recibo
      await Detalle.deleteMany({ reciboId: deletedRecibo._id });

      return deletedRecibo;
    },

    updateRecibo: async (_, args) => {
      const updatedRecibo = await Recibo.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      if (!updatedRecibo) throw new Error("Recibo no existe");
      return updatedRecibo;
    },

    //* Items
    createItem: async (_, { descripcion, p_unit }) => {
      const item = new Item({
        descripcion,
        p_unit,
      });
      const savedItem = await item.save();
      return savedItem;
    },

    deleteItem: async (_, { _id }) => {
      const deletedItem = await Item.findByIdAndDelete(_id);
      if (!deletedItem) throw new Error("Item no existe");
      return deletedItem;
    },

    updateItem: async (_, args) => {
      const updatedItem = await Item.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      if (!updatedItem) throw new Error("Item no existe");
      return updatedItem;
    },

    //* Detalles
    createDetalle: async (
      _,
      { reciboId, descripcion, p_unit, cantidad, p_total }
    ) => {
      const reciboFount = await Recibo.findById(reciboId);
      if (!reciboFount) throw new Error("Recibo no existe");

      const detalle = new Detalle({
        reciboId,
        descripcion,
        p_unit,
        cantidad,
        p_total,
      });
      const savedDetalle = await detalle.save();
      return savedDetalle;
    },

    deleteDetalle: async (_, { _id }) => {
      const deletedDetalle = await Detalle.findByIdAndDelete(_id);
      if (!deletedDetalle) throw new Error("Detalle no existe");
      return deletedDetalle;
    },

    updateDetalle: async (_, args) => {
      const updatedDetalle = await Detalle.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      if (!updatedDetalle) throw new Error("Detalle no existe");
      return updatedDetalle;
    },
  },

  //? Para consultar los arreglas pertenecientes a la FK
  Cliente: {
    recibos: async (parent) => await Recibo.find({ clienteId: parent._id }),
  },

  Recibo: {
    // devolver el cliente a que pertenece el recibo
    cliente: async (parent) => await Cliente.findById(parent.clienteId),
    // consultar los arreglos pertenecientes a la FK de Recibo con Detalle
    detalles: async (parent) => await Detalle.find({ reciboId: parent._id }),
  },

  // * se podria hacer una consulta por detalles y que retorne lista de detalles con el
  // * recibo a que pertenecen y al cliente que pertenece...
};
