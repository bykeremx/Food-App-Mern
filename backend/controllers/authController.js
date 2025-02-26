import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import UserModel from '../models/userModel.js';
import CreateJwt from "../jwt/jwtCreate.js";


export const login = expressAsyncHandler(async (req, res) => {

    const { email, password } = req.body;
    if (email == '' || password == '') {
        return res.status(400).json({ message: "Gerekli Alanları Doldurun Lütfen ! " });
    }
    const is_user = await UserModel.find({ email: email });
    if (is_user.length === 0) {
        return res.status(401).json({ message: "Kullanıcı Adı veya Şifre Yanlış!" });
    }
    const is_password_correct = await bcrypt.compare(password, is_user[0].password);
    if (!is_password_correct) {
        return res.status(401).json({ message: "Kullanıcı Adı veya Şifre Yanlış!" });
    }
    res.status(200).json({ message: "Giriş Başarılı ", user: is_user[0], _token: CreateJwt(is_user[0].id) });
});


export const register = expressAsyncHandler(async (req, res) => {
    const { name, email, password, address } = req.body;

    // Gerekli alanların dolu olup olmadığını kontrol et
    if (!name || !email || !password || !address) {
        return res.status(400).json({ message: "Lütfen tüm alanları doldurun!" });
    }

    // Address alanının bir dizi olup olmadığını kontrol et
    if (!Array.isArray(address) || address.length === 0) {
        return res.status(400).json({ message: "Adres bilgisi eksik veya hatalı!" });
    }

    // E-posta adresinin zaten kayıtlı olup olmadığını kontrol et
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
        return res.status(400).json({ message: "Bu e-posta zaten kullanımda!" });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kullanıcıyı oluştur
    const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        address, // Adresi ekledik
    });

    // Başarı yanıtı gönder
    res.status(201).json({
        message: "Kullanıcı kaydı başarılı!",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            created_at: user.created_at,
            address: user.address, // Adres bilgisini döndürelim
        },
        _token: CreateJwt(user._id),
    });
});

//auth test 

export const authTest = expressAsyncHandler(async (req, res) => {
    res.json({ message: "Auth test successful" });
});

// profile get

