import * as React from 'react'
import classes from './ModalBackdrop.module.sass'

interface IModalBackdrop {
    children: React.ReactElement
    open: boolean
    onClick?: () => void
    position?: 'absolute' | 'fixed'
}

const ModalBackdrop = ({
    children,
    open,
    onClick,
    position,
}: IModalBackdrop): React.ReactElement => {
    const backdropStyles = [classes.wrapper]

    if (position === 'fixed') backdropStyles.push(classes.fixed)
    else backdropStyles.push(classes.absolute)

    if (!open) backdropStyles.push(classes.hidden)
    return (
        <div
            className={backdropStyles.join(' ')}
            onClick={(event) =>
                event.currentTarget === event.target && onClick()
            }
        >
            {children}
        </div>
    )
}

export default ModalBackdrop
