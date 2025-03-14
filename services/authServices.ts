import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { email, password })

    const { token, user } = response.data.data

    if (token) {
        // Store token using API
        await axios.post('/api/auth/set-token', { token });

        // Store user name in localStorage
        localStorage.setItem('userName', user.name);
        localStorage.setItem('avatar', user.avatar)

        return response.data
    }
}


export const register = async (email: string, password: string, password_confirmation: string) => {
    const response = await axios.post(`${API_URL}/register`, { email, password, password_confirmation })
    return response
}

export const logout = async () => {
    try {
        // Panggil API logout untuk menghapus token dari cookie
        const response = await axios.post('/api/auth/logout', {}, {
            withCredentials: true // Penting untuk menyertakan cookies dalam request
        });

        // Jika logout di backend berhasil, kita bisa mengembalikan response atau true
        return response.data;
    } catch (error) {
        console.error('Error saat logout:', error);
        throw error; // Re-throw error agar dapat ditangani oleh komponen yang memanggil
    }
}