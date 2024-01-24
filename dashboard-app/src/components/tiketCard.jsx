'use client'
import { useState } from "react"

// import {formatRupiah} from "../lib/formatRupiah"
export default function TiketCard(props){
    return (
        <div>
            <div className="card w-full bg-blue-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{props.item.category}</h2>
                    <p>Rp.{props.item.price.toLocaleString('id-ID')}</p>
                    <p>Hello</p>
                    
                    <div className="card-actions justify-end items-center border-t py-2 border-blue-500 border-dotted">
                        <button className="btn btn-primary" onClick={() => props.onSelect(props.item, '-')}>-</button>
                        {
                            props.stat[props.item.id]?.quota?
                                props.stat[props.item.id]?.quota
                            :
                                0
                        }
                        <button className="btn btn-primary" onClick={() => props.onSelect(props.item, '+')}>+</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


/*
    [
        {
            categoryId: 1, 
            qty: 1
        }
    ]
*/