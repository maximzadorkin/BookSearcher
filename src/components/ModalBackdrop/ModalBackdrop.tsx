import * as React from 'react'
import classes from './ModalBackdrop.module.sass'

interface IModalBackdrop {
    children: React.ReactElement
    onClick?: () => void
}

const ModalBackdrop = ({
    children,
    onClick,
}: IModalBackdrop): React.ReactElement => {
    return (
        <div className={classes.wrapper} onClick={onClick}>
            {children}
        </div>
    )
}

export default ModalBackdrop
