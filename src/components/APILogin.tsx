import React, { useState } from "react";
import CommonButton from "./CommonButton";
import appIcon from '../img/instagpt.svg';
const APILogin = (props: { callback: () => void }) => {
    const [apiKey, setApiKey] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [tryAgain, setTryAgain] = useState(false);
    return (
        <div style={{
            display: 'grid',
            justifyContent: 'center'
        }}>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            gap: 15,
            margin: 5
        }}>
            <img src={appIcon} width={64} height={64}></img>
            <div style={{
                color: '#0d3b66'
            }}>
                Please copy and paste your API Key from <br />
                <a
                    href={"https://platform.openai.com/account/api-keys"}
                    target="_blank">
                    https://platform.openai.com/account/api-keys
                </a>
            </div>
            <div style={{
                display: 'flex',
                width: '100%',
                gap: 5,
                justifyContent: 'space-around'
            }}>
                <input style={{
                    border: '2px dotted #f95738',
                    borderRadius: 2.5,
                    padding: 5,
                    fontSize: 15,
                    width: '80%'
                }} onChange={e => setApiKey(e.target.value)}>

                </input>
                {/* <div
                    style={{
                        cursor: 'pointer',
                        backgroundColor: submitting ? '#bcb8b1' : '#f95738',
                        padding: 5,
                        borderRadius: 2.5,
                        color: 'white'
                    }}
                    onClick={async () => {
                        setTryAgain(false);
                        setSubmitting(true);
                        if (await window.eel.submit_api_key(apiKey)()) {  // key is ok
                            props.callback();
                        } else {
                            setTryAgain(true);
                        }
                        setSubmitting(false);
                    }}>
                    Submit
                </div> */}
                
            <CommonButton activeName="Submit" inactiveName="Submit" onClick={async () => {
                        setTryAgain(false);
                        setSubmitting(true);
                        if (await window.eel.submit_api_key(apiKey)()) {  // key is ok
                            props.callback();
                        } else {
                            setTryAgain(true);
                        }
                        setSubmitting(false);
                    }} pressed={submitting}/>
            </div>
            <div style={{color: '#ba181b'}}>{tryAgain? "Verification failed. Please try again." : ""}</div>
        </div>
        </div>
    )
}

export default APILogin;