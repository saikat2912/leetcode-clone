'use client'
import { authModalState } from "@/atoms/AuthModalAtom";
import React,{useState,useEffect} from "react";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from "recoil";
import { auth } from "@/firebase/firebase";
import {toast} from "react-toastify";
import { useRouter } from "next/navigation";

type LoginProps ={

};

const Login:React.FC<LoginProps>=()=>{
    const setAuthModalState = useSetRecoilState(authModalState);
    const [inputs,setInputs] = useState({email:'',password:''})
    const router= useRouter();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    const handleClick =(type:"login"|"register"|"forgotPassword")=>{
        console.log(`Action: ${type}`);
        setAuthModalState((prev)=>({...prev,type}))
        console.log(authModalState)
    }

    const handleChangeInput =(e:React.ChangeEvent<HTMLInputElement>)=>{
        setInputs((prev)=>({...prev,[e.target.name]:e.target.value}));
    }

    const handleLogin =async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(!inputs.email || !inputs.password) return alert("Please fill out the fields");

        try{
            const newUser = await signInWithEmailAndPassword(inputs.email,inputs.password);
            if(!newUser) return;
            router.push("/")

        }
        catch(error:any){
            console.log("It came to error")
            alert(error.message)
        }

    }

    useEffect(()=>{
        if(error) toast.error(error.message,{position:"top-center",autoClose:3000,theme:"dark"});
    })

    return <form className="space-y-6 px-6 py-6"  onSubmit={handleLogin}>
        <h3 className="text-xl font-medium text-white">Sign In to Leetcode</h3>
        <div>
            <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
                Your Email
            </label>
            <input type="email" name="email" id="email" onChange={handleChangeInput} className="border-2 outline-none sm:text:sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-600 placeholder-gray-400 text-white" placeholder="name@gmail.com"/>
            </div>
            <div>
                      <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">
               Password
            </label>
            <input type="password" name="password" onChange={handleChangeInput} id="password" className="border-2 outline-none sm:text:sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-600 placeholder-gray-400 text-white" placeholder="name@gmail.com"/>
           
        </div>
        <button type="submit" className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s">
    Login
        </button>
        <button className="flex w-full justify-end" onClick={()=>handleClick("forgotPassword")}>
            <a href="#" className="text-sm block text-brand-orange hover:underline w-full text-right">Forget Password</a>
        </button>
       <div className="text-sm font-medium text-gray-500">
            Not registered?
            <a href="#" className="text-blue-700 hover:underline" onClick={()=>handleClick("register")}>
                Create Account
            </a>
       </div>
    </form>
}

export default Login;