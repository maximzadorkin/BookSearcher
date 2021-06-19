import * as React from 'react'
import classes from './BookSnippet.module.sass'

interface IBookSnippet {
    title: string
    author: string
    urlImg: string
    onClick?: () => void
}
const BookSnippet = ({
    title,
    author,
    urlImg,
    onClick,
}: IBookSnippet): React.ReactElement => {
    const maxTextLength = 60

    return (
        <div className={classes.wrapper} onClick={onClick}>
            {urlImg && (
                <div
                    style={{ backgroundImage: `url(${urlImg})` }}
                    className={classes.img}
                />
            )}
            <div className={[classes.textBlock].join(' ')}>
                <span className={classes.title} title={title}>
                    {title}
                </span>
                <p className={classes.text}>
                    {`${author}`.slice(0, maxTextLength)}
                </p>
            </div>
        </div>
    )
}

export default BookSnippet
