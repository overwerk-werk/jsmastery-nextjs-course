"use client";

import React from 'react';
import Image from 'next/image';
import { toast } from "sonner"

import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';
import ROUTES from '@/constants/routes';


const SocialAuthForm = () => {
    const buttonClass = "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5";

    const handleSignIn = async ( provider: "GitHub" | "Google") => {
        try {
            // throw new Error("not implemented")
            await signIn(provider, {
                callbackUrl: ROUTES.HOME,
                redirect: false,
            })
        } catch (error) {
            console.log(error)

            toast("Sign-in Failed",{
                description: 
                error instanceof Error
                ? error.message:
                "An error occurred during sign-in"
            });
        }
    }

  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
        <Button className={ buttonClass } onClick={() => handleSignIn("GitHub")}>
            <Image 
            src="/icons/github.svg"
            alt="Github Logo"
            width={20}
            height={20}
            className="invert-colors mr-2.5 object-contain"
            />
            <span>Log in with GitHub</span>
        </Button>

        <Button className={ buttonClass } onClick={() => handleSignIn("Google")}>
            <Image 
            src="/icons/google.svg"
            alt="Google Logo"
            width={20}
            height={20}
            className="invert-colors mr-2.5 object-contain"
            />
            <span>Log in with Google</span>
        </Button>
    </div>
  )
}

export default SocialAuthForm