import mongoose from "mongoose";

const ClienteSchema = new mongoose.Schema(
  {
    dni: {
      type: Number,
      unique: true,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cliente", ClienteSchema);
