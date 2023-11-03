import React, { FC } from 'react'
import './modal-window.css'
import { observer } from 'mobx-react-lite'

export interface ModalProps {
    active: boolean,
    setActive: any,
    children: any
}

const ModalWindow: FC<ModalProps> = ({ active, setActive, children }) => {
    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'modal-content active' : 'modal-content'} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default observer(ModalWindow);