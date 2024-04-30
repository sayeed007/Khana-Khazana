'use client'

import { useEffect, useState } from 'react';

import { AuthContext } from '../contexts';
import Cookies from 'js-cookie';

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        let authData = null;
        if (typeof window !== 'undefined' && Cookies?.get('auth')) {
            authData = JSON?.parse(Cookies?.get('auth'));
            setAuth(authData);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}