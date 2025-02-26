import React, { useState, useContext } from 'react'
import FoodContext from '../context/FoodContext';

const useFood = () => {
    const [loading, setLoading] = useState();
    const { state, dispatch } = useContext(FoodContext);
    // fetch data from API
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
    }
    return {
        loading,
        getFood,
    }
}

export default useFood
