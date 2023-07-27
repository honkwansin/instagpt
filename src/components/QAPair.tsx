import React, {useState, useEffect}from 'react';
import '../styles/style.css';
import { BsXCircleFill } from 'react-icons/bs';

const QAPair = (props: 
    {
        description: string, 
        index: number,
        onChange:(i:number, v:string) => void,
        onDelete:(i:number) => void,
    }) => {

    const examples = [
        "Our product comes in sizes ranging from 4 to 14.",
        "We currently have a 10% discount on digital cameras and 20% on laptops.",
        "The Charizard model is currently out of stock. Restock in roughly 2 weeks.",
        `Go to https://payment.com/myaccountname to pay. Send me the receipt once it's done.`,
        "International shipping is not available.",
        "Timeslots open: Mon 2-6pm, Tue 2-6pm, Wed fully-booked, Thur 3-6pm, Fri not open",
        "Each session is $45 USD.",
        "We offer half refunds if you are unsatisfied with the experience."
    ]
    const [description, setDescription] = useState(props.description);
    const [hideDelete, setHideDelete] = useState(true);

    useEffect(() => {
        setDescription(props.description);
      }, [props.description]);
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 5}}
                onMouseOver={() => setHideDelete(false)}
                onMouseLeave={() => setHideDelete(true)}
            >
                <input className='input-field' 
                style={{resize: 'none', flex: 1}} 
                value={description} 
                onChange={e => setDescription(e.target.value)}
                onBlur={() => props.onChange(props.index, description)}
                placeholder={`Example: ${examples[Math.floor(Math.random()*examples.length)]}`}
                >
                </input>
                {hideDelete? <></> : 
                    <div 
                        onClick={() => props.onDelete(props.index)} 
                        style={{cursor: 'pointer'}}
                    >
                        <BsXCircleFill></BsXCircleFill>
                    </div>
                }
            </div>
        </div>
    )
}

export default QAPair;