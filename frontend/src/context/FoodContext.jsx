import { createContext, useEffect, useReducer } from 'react';

const FoodContext = createContext();


const initialState = {
    foodList: [],
    cart: [],
}

const foodReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                foodList: state.foodList,
                cart: [...state.cart, action.payload],
            }
        case 'REMOVE_FROM_CART':
            return {
                foodList: state.foodList,
                cart: state.cart.filter(item => item._id !== action.payload),
            }
        default:
            return state;
    }
}

export const FoodProvider = ({ children }) => {
    const [state, dispatch] = useReducer(foodReducer, initialState);
    const getFood = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/food');
            const data = await response.json();
            if (!response.ok) {
                throw new Error('Failed to fetch food');
            }
            dispatch({ type: 'ADD_TO_CART', payload: data });
        } catch (error) {
            console.error(error);
        }

    }
    useEffect(() => {
        getFood();
    }, []);

    return (
        <FoodContext.Provider value={{ state, dispatch }}>
            {children}
        </FoodContext.Provider>
    )
}