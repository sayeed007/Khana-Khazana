'use client'

import { useState } from 'react';
import { registerUser } from "@/app/actions";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';

const RegistrationForm = () => {
    const router = useRouter();
    const { auth, setAuth } = useAuth();

    const [error, setError] = useState("");


    async function createNewUser(event) {
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget);
            const userCreation = await registerUser(formData)

            const modifiedUser = JSON.parse(userCreation);

            if (!userCreation?.error) {
                Cookies.set('auth', JSON.stringify(modifiedUser));
                setAuth(modifiedUser);
                router.push('/');

                // redirect("/login");
            } else {
                setError(userCreation?.error);
            }
        } catch (error) {
            setError(error.message);
        }
    }


    return (
        <>

            <div className="my-2 text-red-500">
                {error}
            </div>

            <form className="login-form" onSubmit={createNewUser}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" id="firstName" />
                </div>

                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="lastName" />
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="email" />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>

                <button type="submit" class="bg-[#eb4a36] py-3 rounded-md text-white w-full mt-4">Create Account</button>
            </form>

        </>
    );
};

export default RegistrationForm;
