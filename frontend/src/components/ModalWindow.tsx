import React, { FC } from 'react'
import '../styles/modal.css'

export interface ModalProps {
    active: boolean,
    setActive: any,
    children: any
}

export const ModalWindow: FC<ModalProps> = ({ active, setActive, children }) => {
    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'modal-content active' : 'modal-content'} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
