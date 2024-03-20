import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    descripcion: {
      type: String,
      required: true,
    },
    p_unit: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Item", ItemSchema);
