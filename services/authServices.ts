import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    const { token, user } = response.data.data;

    if (token) {
        // Store token using API
        await axios.post('/api/auth/set-token', { token });

        // Also store user data in cookies through API
        await fetch('/api/auth/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: user.name,
                avatar: user.avatar || ''
            }),
        });

        return response.data;
    }
};

export const register = async (email: string, password: string, password_confirmation: string) => {
    const response = await axios.post(`${API_URL}/register`, { email, password, password_confirmation });
    return response;
};

export const logout = async () => {
    try {
        // Panggil API logout untuk menghapus token dari cookie
        const response = await axios.post('/api/auth/logout', {}, {
            withCredentials: true // Penting untuk menyertakan cookies dalam request
        });

        // Panggil API user untuk menghapus data user dari cookies
        await fetch('/api/auth/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: '',
                avatar: ''
            }),
        });

        return response.data;
    } catch (error) {
        console.error('Error saat logout:', error);
        throw error; // Re-throw error agar dapat ditangani oleh komponen yang memanggil
    }
};