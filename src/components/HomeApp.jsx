import React, { useContext, useState } from 'react'
import { useAuth } from 'reactfire'
import { AuthContext } from '../contexts/AuthContextApp';
import { Outlet, useNavigate } from 'react-router-dom';
import '../styles/Admin.css'
export const HomeApp = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    if (!user) {
        navigate('/login')
    }
    const changePage = (idx) => {
        setoptions(prev => (prev.map((x, i) => i == idx ? { ...x, active: true } : { ...x, active: false })));
    }
    const [options, setoptions] = useState([
        {
            title: 'Administrar cartera',
            active: false,
            link: 'list'
        },
        {
            title: 'Agregar Letra/Factura',
            active: false,
            link: 'add'
        }
    ])
    return (
        <div className='admin inter'>
            <header className="bg-white">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Compandy</span>
                            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                        </a>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {
                            options.map((x, idx) => (
                                <a onClick={() => { changePage(idx); navigate(x.link) }} key={idx} href="#" className={`text-sm font-semibold leading-6 ${x.active ? 'text-gray-900' : 'text-gray-500'}`}>{x.title}</a>
                            ))
                        }
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <a href="#"
                            onClick={() => auth.signOut()}
                            className="text-sm font-semibold leading-6 text-gray-900">Cerrar sesión<span className='ms-1' aria-hidden="true">&rarr;</span></a>
                    </div>
                </nav>
            </header>
            <Outlet />
        </div>
    )
}
