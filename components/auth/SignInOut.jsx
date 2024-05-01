'use client'

import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth"
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

const SignInOut = () => {
    const { auth, setAuth } = useAuth();
    const router = useRouter();

    console.log(auth);

    const logout = () => {
        Cookies.remove('auth');
        setAuth(null);
        router.push('/login')
    }

    return (
        <>
            {auth ?
                <>
                    <span className="mx-2">
                        Hello,
                        <span className="font-bold mx-1">
                            {auth?.firstName}
                        </span>
                    </span>
                    <span
                        className="cursor-pointer py-2 bg-[#eb4a36] px-6 rounded-md text-white content-center"
                        onClick={logout}>
                        Logout
                    </span>
                </>
                :
                <Link
                    className="py-2 bg-[#eb4a36] px-6 rounded-md text-white content-center"
                    href="/login"
                >
                    Login
                </Link>
            }
        </>
    )
}

export default SignInOut;