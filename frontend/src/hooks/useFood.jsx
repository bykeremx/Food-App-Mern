import { useState, useContext } from 'react';
import FoodContext from '../context/FoodContext';
import { toast, Bounce } from 'react-toastify';

const useFood = () => {
    const [loading, setLoading] = useState(false);
    const { state, dispatch } = useContext(FoodContext);

    // API'den yemekleri al
    const getFood = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3030/api/food");
            const data = await response.json();
            if (!response.ok) {
                throw new Error("Yemekler alınırken hata oluştu.");
            }
            dispatch({ type: "GET_FOODS", payload: data });
        } catch (error) {
            console.error("API Hatası:", error);
            toast.error("Yemekler alınırken bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setLoading(false);
        }
    };

    // Sepete yemek ekleme fonksiyonu
    const AddToCard = (food) => {
        dispatch({ type: 'ADD_TO_CART', payload: food });
        toast(` ${food.name} sepete eklendi`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    };

    // Yemek silme fonksiyonu
    const removeCards = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
        toast(`Sepetten çıkarıldı.`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    };

    // Yemek ekleme fonksiyonu
    const addFoodAdmin = async (newFood) => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3030/api/food", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFood),
            });

            if (!response.ok) {
                throw new Error("Yemek eklenirken hata oluştu.");
            }

            const addedFood = await response.json();
            toast.success("Yemek başarıyla eklendi.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            getFood(); // Yemekler güncelleniyor
        } catch (error) {
            console.error("API Hatası:", error);
            toast.error("Yemek eklenirken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    // Yemek silme fonksiyonu
    const removeFoodAdmin = async (id) => {
        setLoading(true);
        try {
            console.log("Silinmek istenen ID:", id);
    
            const response = await fetch(`http://localhost:3030/api/food/${id}`, { method: 'DELETE' });
            const data = await response.json();
    
            console.log("API Yanıtı:", data); // Gelen cevabı gör
    
            if (!response.ok) {
                throw new Error(data.message || "Yemek silinirken hata oluştu.");
            }
    
            toast.success("Yemek başarıyla silindi.");
            getFood();
        } catch (error) {
            console.error("API Hatası:", error);
            toast.error(error.message || "Yemek silinirken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };
    

    // Yemek güncelleme fonksiyonu
    const updateFoodAdmin = async (id, updatedFood) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3030/api/food/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFood),
            });
            if (!response.ok) {
                throw new Error("Yemek güncellenirken hata oluştu.");
            }
            toast.success("Yemek başarıyla güncellendi.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            getFood(); // Yemekler güncelleniyor
        } catch (error) {
            console.error("API Hatası:", error);
            toast.error("Yemek güncellenirken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        state,
        getFood,
        AddToCard,
        removeCards,
        updateFoodAdmin,
        removeFoodAdmin,
        addFoodAdmin
    };
};

export default useFood;
