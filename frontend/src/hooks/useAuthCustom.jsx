import React, { useContext, useState } from 'react';
import AuthContext from "../context/AuthContext";

const useAuthCustom = () => {
    const [loading, setLoading] = useState(false);
    const { state, dispatch } = useContext(AuthContext);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3030/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Kullanıcı adı veya şifre yanlış!');
            }

            const data = await response.json();
            dispatch({ type: 'LOGIN', payload: data.user });
            localStorage.setItem('token', data.token);

        } catch (error) {
            alert(error.message); // Kullanıcıya hata mesajını göster
            console.error("Giriş hatası:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        login,
        state
    };
};

export default useAuthCustom;
