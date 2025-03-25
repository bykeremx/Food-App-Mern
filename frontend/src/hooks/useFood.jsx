import { useState, useContext } from 'react';
import FoodContext from '../context/FoodContext';
import { toast, Bounce } from 'react-toastify';

const useFood = () => {
    const [loading, setLoading] = useState(false);
    const { state, dispatch } = useContext(FoodContext);

    // Fetch data from API
    const getFood = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3030/api/food");
            const data = await response.json();
            if (!response.ok) {
                throw new Error("Network Error");
            }
            dispatch({ type: "GET_FOODS", payload: data });
        } catch (error) {
            console.error("API Error:", error);
            throw new Error("Bir hata oluştu!");
        } finally {
            setLoading(false);
        }
    };

    // Correct AddToCart function, use food object directly
    const AddToCard = (food) => {
        dispatch({ type: 'ADD_TO_CART', payload: food }); // Send correct food object
        toast(` ${food.name} Sepete eklendi`, {
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
    const removeCards = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id }); // Send correct food id
        toast(`Sepetten Çıkartıldı`, {
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
    }

    return {
        loading,
        state,
        getFood,
        AddToCard ,// Expose addToCart for use in components
        removeCards
    };
}

export default useFood;
