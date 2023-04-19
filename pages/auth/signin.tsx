import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { signIn, useSession } from "next-auth/react";
import { logger } from "@/lib/logger";
import { useRouter } from "next/router";

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();
    console.log( status )
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
            console.log(`POSTing ${JSON.stringify(body, null, 2)}`);
            let res = await signIn("credentials", {
                ...body,
                callbackUrl: router.query.callbackUrl,
            });
            console.log(res)
            return
            // logger.debug(`signing:onsubmit:res`, res);
        } catch (error) {
            logger.error(error);
        }
    }
    // if (status === "authenticated") {
    //     router.push("/", {
    //         query: {
    //             callbackUrl: router.query.callbackUrl,
    //         },
    //     });
    // }

    return (
        <div className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
               
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" {...register("email")} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type={showPassword ? "text" : "password"} {...register("password")}  name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <a onClick={() => setShowPassword( (showPassword) => !showPassword )}>{showPassword ? ('Nascondi') : ('Mostra')}</a>
                            <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}