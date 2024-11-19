import React, { useEffect, useState } from 'react'
import '../styles/List.css'
import axios from 'axios'
import { CONFIG } from '../config'
import moment from 'moment'
import { ConfirmApp } from './ConfirmApp'
import { showInfoToast } from '../utils/showInfoToast'
export const ListApp = () => {
    const [letters, setLetters] = useState(null)
    const [desembolso, setDesembolso] = useState(moment('2024-05-25'))
    const [tabConfirm, setTabConfirm] = useState({ active: false, id: '' });
    const [isDeleting, setIsDeleting] = useState(false);
    const [montoPlanilla, setMontoPlanilla] = useState(0);
    const closeTabConfirm = () => setTabConfirm({ active: false, id: '' });
    const deleteLetter = () => {
        if (!isDeleting) {
            setIsDeleting(true);
            axios.delete(`${CONFIG.uri}/letter/${tabConfirm.id}`)
                .then(res => {
                    getLetters();
                    closeTabConfirm();
                    showInfoToast('Letra eliminada correctamente');
                    setIsDeleting(false);
                })
                .catch(error => {
                    setIsDeleting(false);
                    console.log(error);
                })
        }
    }
    const getLetters = () => {
        axios.get(`${CONFIG.uri}/letter`)
            .then(res => {
                updateList(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        if (letters) {
            updateList([...letters])
        }
    }, [desembolso]);
    const updateList = (data) => {
        setMontoPlanilla(data.reduce((acumlador, item) => acumlador + item.valor, 0));
        const result = [...data].map(item => {
            item.adelanto = moment(item.vencimiento).diff(desembolso, 'days');
            item.te = Math.pow(1 + (item.tasa / 100), item.adelanto / 360) - 1;
            item.comisionAdmin = item.valor * item.admin / 100;
            item.comisionTransferencia = item.valor * item.transferencia / 100;
            item.cargoTotal = item.te + item.comisionAdmin + item.comisionTransferencia + item.portes;
            item.td = item.te / (1 + item.te)
            item.neto = item.valor * (1 - item.td);
            item.descuento = item.valor - item.neto;
            item.seg = (item.seguro / 100) * item.valor * (item.adelanto / 30);
            item.recibido = item.neto - item.comisionTransferencia - item.portes;
            item.entregado = item.seg + item.comisionTransferencia + item.portes + item.valor;
            item.tcea = Math.pow(item.entregado / item.recibido, 360 / (item.adelanto)) - 1;
            return item;
        })
        setLetters(result);
    }
    useEffect(() => {
        getLetters();
    }, [])
    if (!letters) {
        return (
            <div className='flex justify-center items-center bg-slate-400'>
                <h1>Cargando..</h1>
            </div>
        )
    }
    return (
        <>
            <div className='px-20'>
                <div className='cont-table'>
                    <p className='mb-2' style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Letras y facturas</p>
                    <hr />
                    <div className='mt-3'>
                        <div>
                            <span style={{ fontWeight: 'bold' }}>Monto de planilla:</span>
                            <span className='ms-2'>S/. {montoPlanilla ? montoPlanilla.toFixed(2) : '0'}</span>
                        </div>
                        <div className='mt-2'>
                            <span style={{ fontWeight: 'bold' }}>Fecha de reembolzo:</span>
                            <input onChange={(e) => setDesembolso(e.target.value)} value={moment(desembolso).format('YYYY-MM-DD')} className='ms-2' type="date" style={{ padding: '3px 5px', border: '1px solid gray', borderRadius: '2px' }} />
                        </div>
                        <div className='mt-2'>
                            <span style={{ fontWeight: 'bold' }}>Número de documentos:</span>
                            <span className='ms-2'>{letters && letters.length}</span>
                        </div>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table className='mt-10 table table-rounded text-center'>
                            <thead>
                                <tr className='bg-gray-200'>
                                    <th style={{ minWidth: '100px' }}>Detalles del documento</th>
                                    <th style={{ minWidth: '100px' }}>Importe</th>
                                    <th style={{ minWidth: '100px' }}>Fecha de emisión</th>
                                    <th style={{ minWidth: '100px' }}>Fecha de vencimiento</th>
                                    <th style={{ minWidth: '100px' }}>Dias de adelanto</th>
                                    <th style={{ minWidth: '100px' }}>Tasa</th>
                                    <th style={{ minWidth: '100px' }}>TE</th>
                                    <th style={{ minWidth: '150px' }}>Comisión por Adm. de cartera</th>
                                    <th style={{ minWidth: '100px' }}>TD Días</th>
                                    <th style={{ minWidth: '150px' }}>Comisión por trans. de fondos</th>
                                    <th style={{ minWidth: '100px' }}>Portes</th>
                                    <th style={{ minWidth: '100px' }}>Cargo Total</th>
                                    <th style={{ minWidth: '100px' }}>Valor neto</th>
                                    <th style={{ minWidth: '100px' }}>Descuento</th>
                                    <th style={{ minWidth: '100px' }}>Seg. Desgravamen</th>
                                    <th style={{ minWidth: '100px' }}>Valor recibido</th>
                                    <th style={{ minWidth: '100px' }}>Valor entregado</th>
                                    <th style={{ minWidth: '100px' }}>TCEA</th>
                                    <th style={{ minWidth: '100px' }}>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    letters && letters.map((x, idx) => (
                                        <tr key={idx}>
                                            <td>{x.doc}</td>
                                            <td>S/. {x.valor}</td>
                                            <td>{moment(x.emision).format('DD/MM/YYYY')}</td>
                                            <td>{moment(x.vencimiento).format('DD/MM/YYYY')}</td>
                                            <td>{x.adelanto}</td>
                                            <td>{(x.tasa)}%</td>
                                            <td>{(x.te * 100).toFixed(2)}%</td>
                                            <td>{x.comisionAdmin.toFixed(2)}</td>
                                            <td>{(x.td * 100).toFixed(2)}%</td>
                                            <td>{(x.comisionTransferencia.toFixed(2))}</td>
                                            <td>{x.portes}</td>
                                            <td>{x.cargoTotal.toFixed(2)}</td>
                                            <td>{x.neto.toFixed(2)}</td>
                                            <td>{x.descuento.toFixed(2)}</td>
                                            <td>{x.seg.toFixed(2)}</td>
                                            <td>{x.recibido.toFixed(2)}</td>
                                            <td>{x.entregado.toFixed(2)}</td>
                                            <td>{(x.tcea * 100).toFixed(2)}%</td>
                                            <td>
                                                <button
                                                    onClick={() => setTabConfirm({ active: true, id: x._id })}
                                                    className='p-1 px-3 shadow rounded text-red-400'><i className="fa-solid fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    {
                        letters && letters.length == 0 && <p className='text-center'>No se encontraron registros</p>
                    }
                </div>
            </div>
            {
                tabConfirm.active && (<ConfirmApp close={closeTabConfirm} fnConfirm={deleteLetter} isLoading={isDeleting} />)
            }
        </>
    )
}
