import React, { useState, useEffect } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';
import QAPair from './QAPair';
import SectionHeader from './SectionHeader';
import CommonButton from './CommonButton';
import '../styles/style.css'
const SettingsPage = (props: { descriptions: string[], setDescriptions: (newVal: string[]) => void }) => {

    const [unsavedDesc, setUnsavedDesc] = useState<string[]>(props.descriptions);

    const saveDesc = () => {
        const setDescs = async () => {
            await window.eel.save_descriptions(unsavedDesc)();
        }
        setDescs();
        props.setDescriptions(unsavedDesc);
    }
    const editDesc = (index: number, newVal: string) => {
        if (unsavedDesc[index] == newVal) return;
        const newDescs = [...unsavedDesc];
        newDescs[index] = newVal;

        setUnsavedDesc(newDescs);
    }

    const deleteDesc = (index: number) => {
        const updatedList = unsavedDesc.filter((item, i) => i !== index);
        setUnsavedDesc(updatedList);
    };

    const [deletingCookies, setDeletingCookies] = useState(false)
    const deleteCookies = () => {
        const del = async () => {
            await window.eel.clear_cookies()
        }
        setDeletingCookies(true)
        del()
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* <div style={{
                display: 'flex',
                gap: 5,
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 5,
                height: 30,
            }}>
                <div>Descriptions</div>
                <div
                    className={`common-button${props.descriptions == unsavedDesc ? '-pressed' : ''}`}
                    onClick={() => {
                        return props.descriptions == unsavedDesc ? null : saveDesc()
                    }}>{props.descriptions == unsavedDesc ? "Saved" : "Save"}</div>
            </div>
            <div style={{
                fontSize: '0.75em',
                color: 'gray',
                marginBottom: 10,
            }}>
                Describe your business. ChatGPT will use these to answer incoming questions.
            </div> */}
            <SectionHeader button={
                <CommonButton activeName='Save' inactiveName='Saved' onClick={saveDesc} pressed={props.descriptions == unsavedDesc} />}
                title='Descriptions'
                titleDescription='Describe your business. ChatGPT will use these to answer incoming questions.' />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                marginBottom: 10,
            }}>
                {unsavedDesc.map((value, index) => {
                    return <QAPair
                        description={value}
                        key={index}
                        index={index}
                        onDelete={deleteDesc}
                        onChange={editDesc} />
                }
                )}
                <div
                    className='input-field'
                    style={{ display: 'grid', justifyContent: 'center', cursor: 'pointer' }}
                    onClick={() => setUnsavedDesc([...unsavedDesc, ""])}>
                    <BsPlusCircleFill></BsPlusCircleFill>
                </div>
            </div>
            <SectionHeader
                title='Reset Cookies'
                titleDescription='Resetting cookies will allow you to log in with a different account next time you run.'
                button={
                    <CommonButton
                        activeName='Reset'
                        inactiveName='Done'
                        onClick={deleteCookies}
                        pressed={deletingCookies} 
                    />
                }
            />
        </div>
    )
}

export default SettingsPage;