'use client'
import { ButtonHTMLAttributes, FC, useState } from "react";
import Button from "./Button";
import { boolean } from "zod";
import { signOut } from "next-auth/react";
import { CircularProgress } from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    
}
 
const SignOutButton: FC<SignOutButtonProps> = () => {
    const [isSigningOut, setIsSigningOut] = useState<boolean>(false)
    const [error, setError] = useState(false)

    const handleSignOut = async()=>{
        setIsSigningOut(true)
        try {
            await signOut()
        } catch (error) {
            setError(true)
        }finally{
            setIsSigningOut(false)
        }
    }
    return (
      <div>
        {isSigningOut ? <CircularProgress /> : null}
        <Button onClick={handleSignOut}><LogoutOutlined /></Button>
      </div>
    );
}
 
export default SignOutButton;