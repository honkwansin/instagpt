import React, {CSSProperties} from 'react'

const CommonButton = (props: { pressed: boolean, onClick: ()=>void, inactiveName: string, activeName: string, style?:CSSProperties }) => {
    return (
        <div
            className={`common-button${props.pressed ? '-pressed' : ''}`}
            onClick={() => {
                return props.pressed ? null : props.onClick()
            }}
            style={props.style}>{props.pressed ? props.inactiveName : props.activeName}
        </div>
    )
}
export default CommonButton