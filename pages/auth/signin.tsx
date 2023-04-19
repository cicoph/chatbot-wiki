import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { faCircleNotch, faEnvelope, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();
    let defaultBody = {
        grant_type: "",
        email: "asdf@gmail.com",
        password: "asdf",
        scope: "",
        client_id: "",
        client_secret: "",
    };
    
    async function onSubmit(values) {
        try {
            const body = { ...defaultBody, ...values };
            let res = await signIn("credentials", {
                ...body,
                callbackUrl: router.query.callbackUrl,
            });
        } catch (error) {
            console.error(error);
        }
    }

    if (status === "authenticated") {
        router.push("/", {
            query: {
                callbackUrl: router.query.callbackUrl,
            },
        });
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full border border-solid border-slate-300 my-4 p-4 pt-6 relative bg-slate-100 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-3xl">
                            Accedi
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                    <input type="email" {...register("email", { required: "Email obbligatoria"})} name="email" id="email" placeholder="name@company.com" className="px-3 py-3 placeholder-slate-400 text-slate-600 relative bg-gray-50 border-gray-300 rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                                    <span className="z-10 h-full leading-snug font-normal text-center text-slate-400 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                    <input type={showPassword ? "text" : "password"} {...register("password", { required: "Password obbligatoria"})} name="password" id="password" placeholder="••••••••" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-gray-50 border-gray-300 rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                                    <button type="button" onClick={() => setShowPassword( (showPassword) => !showPassword )} className="z-10 h-full leading-snug font-normal text-center text-slate-400 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </button>
                                </div>
                            </div>
                            <button disabled={isSubmitting} type="submit" className={`w-full ${!isSubmitting ? 'bg-sky-700 hover:bg-sky-800' : 'bg-sky-700/75'} text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>{isSubmitting ? `Login in corso` : 'Accedi'} {isSubmitting && <FontAwesomeIcon className="animate-spin" icon={faCircleNotch} />}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}