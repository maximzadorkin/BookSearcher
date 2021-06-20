import _ from 'lodash'
import * as React from 'react'
import classes from './BookItem.module.sass'

interface BookParam {
    title: string
    value: string | number | string[]
}

interface IBookItem {
    imgUrl: string
    title: string
    params: BookParam[]
}
const BookItem = ({ imgUrl, title, params }: IBookItem): React.ReactElement => {
    const TEXT__EMPTY_DATA: string = 'Нет данных'
    const [HaveImg, SetHaveImg] = React.useState(true)
    return (
        <div className={classes.wrapper}>
            <div
                className={classes.imgWrapper}
                style={{ display: !HaveImg && 'none' }}
            >
                <img
                    src={imgUrl}
                    alt={title}
                    className={classes.img}
                    onLoad={() => SetHaveImg(true)}
                    onError={() => SetHaveImg(false)}
                />
            </div>
            <div className={classes.textWrapper}>
                <h3 className={classes.title}>{title || TEXT__EMPTY_DATA}</h3>
                {params.map((param) => (
                    <div className={classes.paramBlock} key={_.uniqueId()}>
                        <h6 className={classes.text}>{param.title}:</h6>
                        <span className={classes.text}>
                            {param.value instanceof Array
                                ? param.value.join(', ')
                                : param.value || TEXT__EMPTY_DATA}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export { BookParam }
export default BookItem
