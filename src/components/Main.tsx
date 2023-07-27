import React, {CSSProperties, useState, useEffect} from 'react';
import SettingsPage from './SettingsPage';
import RunPage from './RunPage';
import UnansweredPage from './UnansweredPage';
import { BsPlayFill, BsGearFill, BsFillChatSquareFill} from 'react-icons/bs';
import Tab from './Tab';

import '../styles/style.css';

const Main = (props: {descriptions:string[], unanswered:{sender: string, message: string}[]}) => {
    
    const [page, setPage] = useState('Settings');
    const [descriptions, setDescriptions] = useState<string[]>(props.descriptions);

    const [isRunning, setIsRunning] = useState(false)
    window.eel.expose(setIsRunning, 'set_is_running')
    const [statusText, setStatusText] = useState("Currently not running")
    window.eel.expose(setStatusText, 'change_status')
    const [unanswered, setUnanswered] = useState(props.unanswered);
    function addUnanswered(newQuestion: string) {
        setUnanswered(prev=>[...prev, JSON.parse(newQuestion)]);
    }
    window.eel.expose(addUnanswered, 'add_unanswered')

    const pages = ["Settings", 'Unanswered', 'Run'];
    const pageElements = pages.map((value, index) => {
        return (
                <Tab name={value} key={index} selected={page==value} onClick={setPage}
                icon={value=='Settings'
                    ?<BsGearFill/>:
                    value=="Unanswered"
                    ?(unanswered.length>0?<div style={{color: '#e26d5c'}}>{unanswered.length}</div>:<BsFillChatSquareFill/>):
                    value=="Run"
                    ?(isRunning?<BsPlayFill color="#e26d5c"/>:<BsPlayFill color="#d6ccc2"/>)
                :<BsPlayFill/>}/>
        )})
    return (
        <div style={{
            display: 'flex',
            height: '100%',
            width: '100%',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '20%',
                height: '100%',
                justifyContent: 'stretch',
            }}>
                {pageElements}
            </div>
            <div className='no-scroll' style={{
                width: '80%',
                padding: '5%',
                gap: 10,
                overflow: 'scroll',
            }}>
                {page=='Settings'
                    ?<SettingsPage descriptions={descriptions} setDescriptions={setDescriptions}/>:
                page=="Unanswered"
                    ?<UnansweredPage questionList={unanswered} setUnanswered={setUnanswered}/>:
                page=="Run"
                    ?<RunPage isRunning={isRunning} statusText={statusText}/>
                :<></>}
                
            </div>
        </div>
    )
}

export default Main;