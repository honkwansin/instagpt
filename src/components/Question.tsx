import React, { useEffect, useState } from 'react'
import { BsXCircleFill } from 'react-icons/bs';
import '../styles/style.css'

const Question = (props: { sender: string, message: string, deleteSelf: (i:number)=>void, index: number }) => {
    const [showDelete, setShowDelete] = useState(false);
    const [shortID, setShortID] = useState(props.sender);
    useEffect(() => {
        const ids = props.sender.split('/').filter(str => str != '');

        setShortID('@'+ids.slice(-1)[0] || '')
    }, [props.sender])
    return (
        <div style={{
            display: 'flex',
            gap: 3,
            alignItems: 'center'
        }}
            onMouseEnter={() => setShowDelete(true)}
            onMouseLeave={() => setShowDelete(false)}
        >
            <div style={{padding: 5}}><a href={props.sender} target="_blank" rel="noopener noreferrer">{shortID + ":"}</a></div>
            <div className='speech-bubble'>
                {props.message}
            </div>
            <div style={{
                width: '10%',
                cursor: showDelete?'pointer':''
            }}
            onClick={()=>showDelete?props.deleteSelf(props.index):null}>
                {showDelete?<BsXCircleFill/>:null}
            </div>
        </div>
    )
}
export default Question;