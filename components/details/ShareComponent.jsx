'use client'


import Share from '@/public/Icons/Share.svg';

import React, { useEffect, useRef, useState } from "react";
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    InstapaperShareButton,
    InstapaperIcon
} from "react-share";



const ShareComponent = ({ recipeInfo }) => {

    const [currentURL, setCurrentURL] = useState(null);
    const [shareButtonVisible, setShareButtonVisible] = useState(false);
    const shareButtonRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentURL(window.location.href);
        }

        // Add event listener to detect clicks outside the share button container
        const handleClickOutside = (event) => {
            if (shareButtonRef.current && !shareButtonRef.current.contains(event.target)) {
                setShareButtonVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);





    return (
        <>


            <div
                className="flex justify-center relative"

            >
                {shareButtonVisible &&
                    <div
                        className='absolute flex top-[-40px] left-[-50px] gap-[5px]'
                        ref={shareButtonRef}
                    >
                        <FacebookShareButton
                            url={currentURL}
                            quote={`Khana Khazana : ${recipeInfo?.name}`}
                            hashtag={`Recipe-of-${recipeInfo?.name}`}
                            className="socialMediaButton"
                        >
                            <FacebookIcon size={36} round={true} />
                        </FacebookShareButton>
                        <TwitterShareButton
                            url={currentURL}
                            quote={`Khana Khazana : ${recipeInfo?.name}`}
                            hashtag={`Recipe-of-${recipeInfo?.name}`}
                            className="socialMediaButton"
                        >
                            <TwitterIcon size={36} round={true} />
                        </TwitterShareButton>
                        <InstapaperShareButton
                            url={currentURL}
                            quote={`Khana Khazana : ${recipeInfo?.name}`}
                            hashtag={`Recipe-of-${recipeInfo?.name}`}
                            className="socialMediaButton"
                        >
                            <InstapaperIcon size={36} round={true} />
                        </InstapaperShareButton>
                    </div>
                }

                <div className='flex'
                    onClick={() => setShareButtonVisible(!shareButtonVisible)}
                >
                    <Share
                        alt='Share'
                    />
                    <span>Share</span>
                </div>
            </div>
        </>
    );
};



export default ShareComponent