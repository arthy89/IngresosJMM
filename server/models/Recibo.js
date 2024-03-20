import mongoose from "mongoose";

const ReciboSchema = new mongoose.Schema(
  {
    numero: {
      type: Number,
      required: true,
    },
    clienteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cliente", // referencia al modelo Cliente - FK
      required: true,
    },
    sub_total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Recibo", ReciboSchema);
