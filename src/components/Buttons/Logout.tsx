import React from "react";
import { FiLogOut } from "react-icons/fi";
import { auth } from "@/firebase/firebase";
import {useSignOut} from "react-firebase-hooks/auth";

type LogoutProps ={

};

const Logout :React.FC<LogoutProps> =()=>{
        const [signOut,loading,error] = useSignOut(auth);
        const handleLogout =()=>{
                signOut();
        }

        return <div className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange" onClick={handleLogout}>
                <FiLogOut/>
        </div>
}

export default Logout;

