import React from 'react'

export const ConfirmApp = ({ close, fnConfirm, isLoading }) => {
    return (
        <div className='tab-confirm'>
            <div>
                <div className='text-center' style={{ fontSize: '3rem' }}>
                    😟
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>¿Estas seguro de eliminar</h3>
                <div className='mt-3 flex justify-between'>
                    <button className='px-4 py-2 bg-slate-400 text-white rounded' onClick={() => close()}>Cancelar</button>
                    <button className='px-4 py-2 bg-slate-700 text-white rounded' onClick={() => fnConfirm()}>
                        {isLoading && (<i className="spinner fa-solid fa-spinner me-2"></i>)}
                        Aceptar</button>
                </div>
            </div>
        </div>
    )
}
