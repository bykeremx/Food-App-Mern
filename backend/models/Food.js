import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        category: {
            type: String,
            enum: ["Ana Yemek", "Tatlı", "İçecek", "Aperatif"],
            required: true,
        },
        image: { type: String, required: true },
        ingredients: [{ type: String }],
        isAvailable: { type: Boolean, default: true }, // Stok durumu
    },
    { timestamps: true }
);

export default  mongoose.model("Food", foodSchema);
