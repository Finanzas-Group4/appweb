import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'reactfire';
import { showInfoToast } from '../utils/showInfoToast';

export const RegisterApp = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const auth = useAuth();
    const signUp = (data) => {
        if (data.password != data.password_confirm) return showInfoToast('Las contraseñas no coinciden');
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(res => {
                showInfoToast('Cuenta registrada');
                navigate('/login')
            })
            .catch(error => {
                console.log(error.code);
                showInfoToast(error.code.split('/')[1].split('-').join(' '));
            })
    }
    return (
        <div className="inter flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://media.licdn.com/dms/image/C4E1BAQHCfiEKdaZU-w/company-background_1536_768/0/1584122666864?e=2147483647&v=beta&t=X0A-mVjUhTqwR28MIfLBj3zsWxEV6g8flrbHfFN_WT4" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Registro de cuenta</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(signUp)} className="space-y-6">
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
                        </div>
                        <div className="mt-2">
                            <input
                                {...register('password', { required: true })}
                                type="password" autoComplete="current-password" required className="focus:outline-none ps-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <div className="mt-5 flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Verificar contraseña</label>
                        </div>
                        <div className="mt-2">
                            <input
                                {...register('password_confirm', { required: true })}
                                type="password" autoComplete="current-password" required className="focus:outline-none ps-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    ¿Ya tienes una cuenta?
                    <a href="#" onClick={() => navigate('/login')} className="ms-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in</a>
                </p>
            </div>
        </div>
    )
}
