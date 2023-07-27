import React, { useState, useEffect } from 'react'
import APILogin from './APILogin';
import Main from './Main';
import appIcon from '../img/instagpt.svg'

const Landing = () => {
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const verify = async () => await window.eel.check_key()();
    useEffect(() => {
        const cacheValues = async () => {
            setDescriptions(await window.eel.get_descriptions()());
            setUnanswered(await window.eel.get_unanswered()());
            console.log('finish caching')
        }
        verify().then(e => {
            if (e) {
                setVerified(e);
            }
            cacheValues().then(()=>setLoading(false))
        });
    }, [])

    const [descriptions, setDescriptions] = useState<string[]>([]);
    const [unanswered, setUnanswered] = useState<{sender: string, message: string}[]>([]);
    // caching both descriptions and unanswered questions from file


    const login = () => {
        setVerified(true);
        setLoading(false);
    }
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {/* <Main></Main> */}
            {loading ? 
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
                    <img src={appIcon} width={64} height={64}></img>

                    <div style={{textAlign: 'center'}}>Loading...</div>
                </div>
                : (verified ? <Main descriptions={descriptions} unanswered={unanswered}></Main> : <APILogin callback={login}></APILogin>)}
        </div>
    )
}


export { Landing }