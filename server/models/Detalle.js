import mongoose from "mongoose";

const DetalleSchema = new mongoose.Schema(
  {
    reciboId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recibo",
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    p_unit: {
      type: Number,
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
    p_total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Detalle", DetalleSchema);
