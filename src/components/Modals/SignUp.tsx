'use client'
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/AuthModalAtom";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

type SignUpProps ={

};

const SignUp:React.FC<SignUpProps>=()=>{

    const setAuthModalState = useSetRecoilState(authModalState);
    const handleClick =(action:"login"|"register"|"forgotPassword")=>{
        setAuthModalState((prev)=>({...prev,action}))
    }
    const router= useRouter();
    const [inputs,setInputs] = useState({email:'',displayName:'',password:''})
    const [createUserWithEmailAndPassword,user,loading,error] = useCreateUserWithEmailAndPassword(auth)

    const handleChangeInput =(e:React.ChangeEvent<HTMLInputElement>)=>{
        setInputs((prev)=>({...prev,[e.target.name]:e.target.value}));
    }

    const handleRegister =async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(!inputs.email || !inputs.password || !inputs.displayName) return alert("Please fill all the fields")
        try{
            const newUser = await createUserWithEmailAndPassword(inputs.email,inputs.password);
            if(!newUser)return;
            router.push("/");
    
    
        }
        catch(error:any){
            alert(error.message);
        }
    }

    useEffect(()=>{
        if(error) alert(error.message)
    },[error])
   

    return <form className="space-y-6 px-6 py-6" onSubmit={handleRegister}>
        <h3 className="text-xl font-medium text-white">Register to Leetcode</h3>
        <div>
            <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
             Email
            </label>
            <input onChange={handleChangeInput} type="email" name="email" id="email" className="border-2 outline-none sm:text:sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-600 placeholder-gray-400 text-white" placeholder="name@gmail.com"/>
            </div>
            <div>
            <label htmlFor="displayName" className="text-sm font-medium block mb-2 text-gray-300">
                Display Name
            </label>
            <input type="text" name="displayName" id="displayName" className="border-2 outline-none sm:text:sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-600 placeholder-gray-400 text-white" placeholder="name@gmail.com" onChange={handleChangeInput}/>
            </div>
            <div>
                      <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">
              Your Password
            </label>
            <input type="password" name="password" id="password" className="border-2 outline-none sm:text:sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-600 placeholder-gray-400 text-white" placeholder="name@gmail.com" onChange={handleChangeInput}/>
           
        </div>
        <button type="submit" className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s">
            {loading ? "Loading..." :"Register"}
        </button>
        <button className="flex w-full justify-end">
            <a href="#" className="text-sm block text-brand-orange hover:underline w-full text-right">Forget Password</a>
        </button>
       <div className="text-sm font-medium text-gray-500">
            Already have an account?
            <a href="#" className="text-blue-700 hover:underline" onClick={()=>handleClick("login")}>
                Log In
            </a>
       </div>
    </form>
}

export default SignUp;