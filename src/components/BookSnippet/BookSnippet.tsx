import * as React from 'react'
import classes from './BookSnippet.module.sass'

interface IBookSnippet {
    title: string
    author: string | string[]
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
    const [HaveImg, SetHaveImg] = React.useState(Boolean(urlImg))

    return (
        <div className={classes.wrapper} onClick={onClick}>
            <div
                style={{
                    backgroundImage: `url(${urlImg})`,
                    display: !HaveImg && 'none',
                }}
                className={classes.img}
                onLoad={() => SetHaveImg(true)}
                onError={() => SetHaveImg(false)}
            />
            <div className={[classes.textBlock].join(' ')}>
                <span className={classes.title} title={title}>
                    {title}
                </span>
                <p className={classes.text}>
                    {`${author.toString()}`.slice(0, maxTextLength)}
                </p>
            </div>
        </div>
    )
}

export default BookSnippet
