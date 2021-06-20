import * as React from 'react'
import classes from './Button.module.sass'

interface IButton {
    onClick: () => void
    children: string | React.ReactElement | HTMLElement
    variant?: 'primary' | 'success' | 'error' | 'inherit'
    style?: object
}

const Button = ({
    onClick,
    children,
    variant,
    style,
}: IButton): React.ReactElement => {
    const btnClasses = [classes.button]
    switch (variant) {
        case 'primary':
            btnClasses.push(classes.primary)
            break
        case 'success':
            btnClasses.push(classes.success)
            break
        case 'error':
            btnClasses.push(classes.error)
            break
        default:
            break
    }

    return (
        <button
            className={btnClasses.join(' ')}
            onClick={onClick}
            style={style}
        >
            {children}
        </button>
    )
}

export default Button
