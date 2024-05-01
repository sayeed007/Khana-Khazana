'use client'


import React, { useEffect, useState } from 'react'
import Favourite from '@/public/Icons/Favourite.svg';
import NonFavourite from '@/public/Icons/NonFavourite.svg';
import { useAuth } from '@/app/hooks/useAuth';
import { toggleUserFavouriteAction } from '@/app/actions';
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';


const ToggleFavourite = (props) => {

    const router = useRouter();
    const { auth, setAuth } = useAuth();
    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        if (props?.recipeInfo?.id && auth?.favourites?.length > 0) {
            setIsFavourite(auth?.favourites?.includes(props?.recipeInfo?.id) ? true : false);
        }

    }, [props?.recipeInfo?.id]);


    const performToggleFavourite = async () => {


        if (auth?.id && props) {
            const userFavourite = await toggleUserFavouriteAction(auth?.id, props?.recipeInfo?.id);

            if (!(JSON.parse(userFavourite))?.error) {

                let userData = { ...auth };
                userData.favourites = (JSON.parse(userFavourite))?.favourites;

                setAuth(userData);

                setIsFavourite(userData?.favourites?.includes(props?.recipeInfo?.id));

                Cookies.set('auth', JSON.stringify(userData));
            }

        } else {
            router.push("/login");
        }


    };


    return (
        <div
            className="flex gap-2 text-gray-600 items-center"
            onClick={() => performToggleFavourite()}
        >
            {isFavourite ?
                <div className="flex justify-center">
                    <Favourite
                        alt='Favourite'
                    />
                </div>
                :
                <div className="flex justify-center">
                    <NonFavourite
                        alt='NonFavourite'
                    />
                </div>
            }
            <span
                className={`cursor-pointer hover:text-[#eb4a36]  ${isFavourite && 'text-[#eb4a36]'}`} >
                Favourite
            </span>

        </div>
    )
}

export default ToggleFavourite