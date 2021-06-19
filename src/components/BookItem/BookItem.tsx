import * as React from 'react'
import classes from './BookItem.module.sass'

interface BookParam {
    title: string
    value: string | number
}

interface IBookItem {
    imgUrl: string
    title: string
    params: BookParam[]
    onClick?: () => void
}
const BookItem = ({
    imgUrl,
    title,
    params,
    onClick,
}: IBookItem): React.ReactElement => {
    const TEXT__EMPTY_DATA: string = 'Нет данных'

    return (
        <div className={classes.wrapper}>
            <div className={classes.imgWrapper}>
                <img src={imgUrl} alt={title} className={classes.img} />
            </div>
            <div className={classes.textWrapper}>
                <h3 className={classes.title}>{title || TEXT__EMPTY_DATA}</h3>
                {params.map((param) => (
                    <div className={classes.paramBlock}>
                        <h6 className={classes.text}>{param.title}:</h6>
                        <span className={classes.text}>
                            {param.value || TEXT__EMPTY_DATA}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export { BookParam }
export default BookItem
