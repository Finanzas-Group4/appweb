import React, { useEffect, useState } from 'react'
import '../styles/Add.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CONFIG } from '../config';
import moment from 'moment';

export const AddApp = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const [bank, setbank] = useState({ tasa: 0, transferencia: 0, portes: 0, seguro: 0, admin: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const banks = {
        'IBK': { tasa: 44.92, transferencia: 0.5, portes: 7.50, seguro: 0.028, admin: 0.55 },
        'SBK': { tasa: 24, transferencia: 0.5, portes: 6.5, seguro: 0.1995, admin: 0.55 },
        'BBVA': { tasa: 32, transferencia: 0.5, portes: 3.5, seguro: 0.069, admin: 0.55 },
        'BCP': { tasa: 32, transferencia: 0.5, portes: 3.5, seguro: 0.115, admin: 0.55 },
    }
    const handleRegister = (data) => {
        if (isLoading) return;
        setIsLoading(true);
        axios.post(`${CONFIG.uri}/letter`, {
            ...data, emision: moment(data.emision), vencimiento: moment(data.vencimiento)
        })
            .then(() => {
                navigate('/admin/list');
            })
            .catch(error => {
                setIsLoading(false);
                console.log(error);
            });

    }
    useEffect(() => {
        setValue('tasa', bank.tasa);
        setValue('transferencia', bank.transferencia);
        setValue('portes', bank.portes);
        setValue('seguro', bank.seguro);
        setValue('admin', bank.admin);
    }, [bank]);
    return (
        <form onSubmit={handleSubmit(handleRegister)} className='px-20'>
            <br />
            <h5 style={{ fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'start' }}>Formulario de registro</h5>
            <div className='content-form mt-3'>
                <div className='px-3'>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Número de documento</label>
                        <div className="mt-1">
                            <input
                                {...register('doc', { required: true })}
                                type="text"
                                className='input-main'
                            />
                            {errors.doc && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Valor nominal</label>
                        <div className="mt-1">
                            <input
                                {...register('valor', { required: true, valueAsNumber: true })}
                                type="number"
                                step="0.01"
                                className='input-main'
                            />
                            {errors.valor && <span className="text-red-500 text-sm">Este campo es requerido y debe ser un número</span>}
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="emision" className="block text-sm font-medium leading-6 text-gray-900">Fecha de emisión</label>
                        <div className="mt-1">
                            <input
                                {...register('emision', { required: true })}
                                type="date"
                                className='input-main'
                            />
                            {errors.emision && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                        </div>
                    </div>
                </div>
                <div className='px-3'>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Fecha de vencimiento</label>
                        <div className="mt-1">
                            <input
                                {...register('vencimiento', { required: true })}
                                type="date"
                                className='input-main'
                            />
                            {errors.vencimiento && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Banco</label>
                        <div className="mt-1" style={{ display: 'flex' }}>
                            <select
                                id="banco"
                                onChange={(e) => setbank(banks[e.target.value] || {})}
                                className='input-main'
                            >
                                <option value=""></option>
                                <option value="IBK">Interbank</option>
                                <option value="SBK">Scotiabank</option>
                                <option value="BBVA">BBVA</option>
                                <option value="BCP">BCP</option>
                            </select>
                            {errors.currency && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Tasa de Descuento Efectiva (MN)</label>
                        <div className="mt-1" style={{ display: 'flex' }}>
                            <input
                                {...register('tasa', { required: true })}
                                type="text"
                                className='input-main'
                            />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="currency" className="block text-sm font-medium leading-6 text-gray-900">Moneda</label>
                        <div className="mt-1">
                            <select
                                id="moneda"
                                {...register('currency', { required: true })}
                                required
                                className='input-main'
                            >
                                <option value="Soles">Soles</option>
                                <option value="Dólares">Dólares</option>
                            </select>
                            {errors.moneda && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                        </div>
                    </div>
                </div>
                <div className='px-3'>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Administración de cartera (%)</label>
                        <div className="mt-1">
                            <input
                                {...register('admin', { required: true, valueAsNumber: true })}
                                type="number"
                                step="0.0001"
                                className='input-main'
                            />
                            {errors.admin && <span className="text-red-500 text-sm">Este campo es requerido y debe ser un número</span>}
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Transferencia de fondos (%)</label>
                        <div className="mt-1">
                            <input
                                {...register('transferencia', { required: true, valueAsNumber: true })}
                                type="number"
                                step="0.0001"
                                className='input-main'
                            />
                            {errors.transfer && <span className="text-red-500 text-sm">Este campo es requerido y debe ser un número</span>}
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Portes</label>
                        <div className="mt-1">
                            <input
                                {...register('portes', { required: true, valueAsNumber: true })}
                                type="number"
                                step="0.0001"
                                className='input-main'
                            />
                            {errors.portes && <span className="text-red-500 text-sm">Este campo es requerido y debe ser un número</span>}
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Seg. Desgravamen ( mensual)</label>
                        <div className="mt-1">
                            <input
                                {...register('seguro', { required: true, valueAsNumber: true })}
                                type="number"
                                step="0.0001"
                                className='input-main'
                            />
                            {errors.seguro && <span className="text-red-500 text-sm">Este campo es requerido y debe ser un número</span>}
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-end'>
                <button type="submit" className='btn-main mt-2' disabled={isLoading}>
                    <span>
                        {isLoading && (<i className="spinner fa-solid fa-spinner me-2"></i>)} Registrar
                    </span>
                </button>
            </div>
        </form>
    )
}
