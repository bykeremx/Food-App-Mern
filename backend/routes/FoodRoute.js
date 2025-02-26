import express from 'express';
import Food from '../models/Food.js'
const router = express.Router();

// 🍽️ Yeni Yemek Ekle
router.post("/", async (req, res) => {
    try {
        const { name, description, price, category, image, ingredients, isAvailable } = req.body;
        const newFood = new Food({ name, description, price, category, image, ingredients, isAvailable });
        await newFood.save();
        res.status(201).json(newFood);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: error.stack,
        });
    }
});

// 🍽️ Tüm Yemekleri Getir
router.get("/", async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 🍽️ Belirli Bir Yemeği Güncelle
router.put("/:id", async (req, res) => {
    try {
        const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedFood);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 🍽️ Yemek Silme
router.delete("/:id", async (req, res) => {
    try {
        await FoodModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Yemek silindi" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;
