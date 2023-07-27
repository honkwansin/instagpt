import React, {ReactNode}from 'react'

const SectionHeader = (props: {button?: ReactNode, title: string, titleDescription: string}) => {
    return (
        <div>
            <div style={{
                display: 'flex',
                gap: 5,
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 5,
                height: 30,
            }}>
                <div>{props.title}</div>
                {props.button}
            </div>
            <div style={{
                fontSize: '0.75em',
                color: 'gray',
                marginBottom: 10,
            }}>
                {/* Describe your business. ChatGPT will use these to answer incoming questions. */}
                {props.titleDescription}
            </div>
        </div>
    )
}

export default SectionHeader;