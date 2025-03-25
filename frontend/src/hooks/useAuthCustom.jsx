import React, { useContext, useState } from 'react';

import { toast, Bounce } from 'react-toastify';
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
            console.log(data);
            localStorage.setItem('token', data._token);
            localStorage.setItem('user', JSON.stringify(data.user));
            toast(` Hoşgeldin ! ${data.user.name}`, {
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

        } catch (error) {
            alert(error.message); // Kullanıcıya hata mesajını göster
            console.error("Giriş hatası:", error.message);
        } finally {
            setLoading(false);
        }
    };
    const register = async (name, email, password,adress) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3030/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password ,address:adress})
            });
            if (!response.ok) {
                throw new Error('Kayıt Olunamadı ! ' + response.message);
            }
            const data = await response.json();
            toast(`Kayıt Başarılı! ${data.user.name}`, {
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
            dispatch({ type: 'LOGIN', payload: data.user });
            localStorage.setItem('token', data._token);
            localStorage.setItem('user', data.user);
        } catch (error) {
            toast(`${error.message}!`, {
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
            console.error("Kayıt hatası:", error.message);
        }finally{
            setLoading(false);
        }

    }

    return {
        loading,
        login,
        state,
        register,

    };
};

export default useAuthCustom;
