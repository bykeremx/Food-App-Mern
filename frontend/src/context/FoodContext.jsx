import { createContext, useEffect, useReducer } from 'react';

const FoodContext = createContext();

const initialState = {
    foodList: [],
    cart: JSON.parse(localStorage.getItem('cart')) || [], // LocalStorage'dan 'cart' verisini al
};

const foodReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            // 'action.payload' burada doğru yemek objesini taşıyor olmalı
            const updatedCart = [...state.cart, action.payload];
            // LocalStorage'ı güncelle
            localStorage.setItem('cart', JSON.stringify(updatedCart));

            return {
                foodList: state.foodList,
                cart: updatedCart,
            };

        case 'REMOVE_FROM_CART':
            const filteredCart = state.cart.filter(item => item._id !== action.payload);
            // LocalStorage'ı güncelle
            localStorage.setItem('cart', JSON.stringify(filteredCart));
            return {
                foodList: state.foodList,
                cart: filteredCart,
            };

        case 'GET_FOODS':
            return {
                foodList: action.payload,
                cart: state.cart,
            };

        default:
            return state;
    }
};

// LocalStorage'dan veriyi alıp, state'e yükleme
const loadStateFromLocalStorage = () => {
    const savedState = localStorage.getItem('foodState');
    if (savedState) {
        return JSON.parse(savedState);
    }
    return initialState; // Eğer LocalStorage'da veri yoksa, başlangıç durumunu döndür
};

export const FoodProvider = ({ children }) => {
    const [state, dispatch] = useReducer(foodReducer, loadStateFromLocalStorage());

    const getFood = async () => {
        try {
            const response = await fetch('http://localhost:3030/api/food');
            const data = await response.json();
            if (!response.ok) {
                throw new Error('Failed to fetch food');
            }
            dispatch({ type: 'GET_FOODS', payload: data });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getFood();
    }, []);

    return (
        <FoodContext.Provider value={{ state, dispatch }}>
            {children}
        </FoodContext.Provider>
    );
};

export default FoodContext;
