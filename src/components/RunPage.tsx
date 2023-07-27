import React, { CSSProperties, useState, useEffect } from 'react';
import '../styles/style.css'
import CommonButton from './CommonButton';

const RunPage = (props: { isRunning: boolean, statusText: string }) => {
    const [isRunning, setIsRunning] = useState(props.isRunning);
    const [statusText, setStatusText] = useState(props.statusText);

    useEffect(() => {
        setStatusText(props.statusText)
    }, [props.statusText])

    useEffect(() => {
        setIsRunning(props.isRunning)
        if (!props.isRunning) setStatusText('Currently not running')
    }, [props.isRunning])
    return (
        <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                textAlign: 'center'
            }}>
                <div></div>
                <div>{statusText}</div>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-around'
                }}>
                    <CommonButton style={{width: '20%'}} activeName='Run' inactiveName='Running' pressed={isRunning} onClick={() => {
                        window.eel.start()();setIsRunning(true);setStatusText('Opening browser...');}} />
                    <CommonButton style={{width: '20%'}} activeName='Stop' inactiveName='Stop' pressed={!isRunning} onClick={() => 
                        { window.eel.stop()(); setStatusText('Stopping...') }} />
                </div>
                {/* <div className={!isRunning ? "common-button-pressed" : "common-button"} onClick={
                    isRunning ? () => { window.eel.stop()(); setStatusText('Stopping...') } : () => null}
                    style={{ width: '20%' }}>
                    Stop
                </div> */}
            </div>
            {/* <div style={styles.switchContainer}>
                <div style={{ width: 5 }}></div>
                <div style={{ ...styles.switch, backgroundColor: isOn ? '#e26d5c' : '#d6ccc2' }}
                    onClick={() => setIsOn(prev => !prev)}>
                    {isOn ? "On" : "Off"}
                    <div style={{ ...styles.switchKnob, left: isOn ? 50 : 0 }}>
                    </div>
                </div>
                <div style={{ width: 5 }}><TiLockClosed /></div>
            </div> */}
        </div>
    )
}

export default RunPage;

const styles: Record<string, CSSProperties> = {
    switchKnob: {
        margin: 5,
        backgroundColor: 'white',
        width: 20,
        height: 20,
        borderRadius: 2.5,
        position: 'absolute',
        transition: 'left 0.3s ease-in-out',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    switch: {
        borderRadius: 2.5,
        transition: 'background-color 0.3s ease-in-out',
        width: 80,
        height: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    switchContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    }
}