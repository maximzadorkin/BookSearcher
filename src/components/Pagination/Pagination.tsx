import * as React from 'react'
import classes from './Pagination.module.sass'
import Button from '../Button/Button'

interface IPagination {
    pageCount: number
    onClick: (selectedPage: number) => void
}
const Pagination = ({
    pageCount,
    onClick,
}: IPagination): React.ReactElement => {
    if (pageCount < 2) return <div></div>
    let $input: HTMLInputElement
    const Text = {
        MAIN: 'Перейти на страницу:',
        SUBMIT: 'Перейти',
        PAGE_COUNT: 'Всего страниц:',
    }
    const setRightSelected = (): number => {
        let selected = Number($input.value)
        if (isNaN(selected) || selected < 1) selected = 1
        if (selected > pageCount) selected = pageCount
        $input.value = String(selected)
        return selected
    }
    const btnHandler = () => {
        const selected = setRightSelected()
        onClick(selected)
    }

    return (
        <div>
            <div className={classes.wrapper}>
                <span className={classes.text}>{Text.MAIN}</span>
                <input
                    type='number'
                    min={1}
                    max={pageCount}
                    defaultValue={1}
                    className={classes.choise}
                    ref={(el) => ($input = el)}
                    onBlur={setRightSelected}
                />
                <Button onClick={btnHandler} type='success'>
                    &#10004;
                </Button>
            </div>
            <span className={classes.text}>
                {Text.PAGE_COUNT} {pageCount}
            </span>
        </div>
    )
}

export default Pagination
