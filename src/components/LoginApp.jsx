import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import '../styles/Login.css'
import { showInfoToast } from '../utils/showInfoToast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
export const LoginApp = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    //auth.signOut() --salir
    const navigation = useNavigate();
    const [isLoading, setisLoading] = useState(false)
    const { register, handleSubmit } = useForm();
    const signIn = (data) => {
        if (!isLoading) {
            setisLoading(true);
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then(res => {
                    navigation('/admin/')
                })
                .catch(error => {
                    setisLoading(false);
                    showInfoToast(error.code.split('/')[1].split('-').join(' '));
                })
        }
    }

    return (
        <div className="inter flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://media.licdn.com/dms/image/C4E1BAQHCfiEKdaZU-w/company-background_1536_768/0/1584122666864?e=2147483647&v=beta&t=X0A-mVjUhTqwR28MIfLBj3zsWxEV6g8flrbHfFN_WT4" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">

                    Iniciar sesión</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(signIn)} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Correo electrónico</label>
                        <div className="mt-2">
                            <input
                                {...register('email', { required: true })}
                                id="email" name="email" type="email" autoComplete="email" required className="focus:outline-none ps-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">¿Olvidaste tu contraseña?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                {...register('password', { required: true })}
                                id="password" name="password" type="password" autoComplete="current-password" required className="focus:outline-none ps-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            <span>{isLoading && (<i className="spinner fa-solid fa-spinner me-2"></i>)}Sign in</span>
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    ¿No tienes una cuenta?
                    <a href="#" onClick={() => navigate('/register')} className="ms-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign up</a>
                </p>
            </div>
        </div>
    )
}
