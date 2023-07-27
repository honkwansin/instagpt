import React, {CSSProperties, ReactNode} from 'react';

const styles: Record<string, CSSProperties> = {
    tab: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}
const Tab = (props: {name: string, selected: boolean, onClick: (pageName: string) => void, icon: ReactNode}) => {

    return (
        <div 
        onClick={()=>props.selected?null:props.onClick(props.name)}
        style={{...styles.tab, 
            ...props.selected? 
                {}:{boxShadow: "inset 0px 0px 5px 0px rgba(0, 0, 0, 0.1)", backgroundColor: '#edede9'},
            cursor: props.selected?'':'pointer',
            userSelect: 'none',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'}}>
                {props.icon}
                {props.name}
    </div>
    )
}

export default Tab;