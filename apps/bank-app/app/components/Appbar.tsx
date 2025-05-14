"use client";
import { signIn, signOut } from "next-auth/react"



interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between shadow-2xl  p-2 px-4">
        <div className="text-lg font-semibold flex flex-col justify-center text-neutral-800 ml-3">
            DummyBank
        </div>
        <div className="flex flex-col justify-center pt-2  lg:mr-10 font-semibold text-lg">
            <button  className = "hover:text-neutral-600 "onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"} </button>
        </div>
    </div>
}