import express from 'express';
import Food from '../models/Food.js'
const router = express.Router();

// 🍽️ Yeni Yemek Ekle
router.post('/', async (req, res) => {
    const { name, description, price, category, image, ingredients, isAvailable } = req.body;

    try {
        // Gelen verileri doğrula
        if (!name || !description || !price || !category || !image || !ingredients) {
            return res.status(400).json({ message: 'Tüm alanları doldurduğunuzdan emin olun!' });
        }

        // Yeni yemek oluştur
        const newFood = new Food({
            name,
            description,
            price,
            category,
            image,
            ingredients,
            isAvailable,
        });

        // Veriyi kaydet
        const savedFood = await newFood.save();

        // Başarılı cevap dön
        res.status(201).json(savedFood);
    } catch (error) {
        console.error("Yemek eklenirken hata oluştu:", error);
        res.status(500).json({ message: 'Sunucu hatası, yemek eklenemedi.' });
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
        console.log("Silinmek istenen ID:", req.params.id);

        const deletedFood = await Food.findByIdAndDelete(req.params.id);

        if (!deletedFood) {
            return res.status(404).json({ message: "Bu ID'ye sahip yemek bulunamadı." });
        }

        res.json({ message: "Yemek silindi" });
    } catch (error) {
        console.error("Silme hatası:", error);
        res.status(500).json({ message: error.message });
    }
});


export default router;
