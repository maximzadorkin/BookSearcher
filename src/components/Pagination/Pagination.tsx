import * as React from 'react'
import classes from './Pagination.module.sass'
import Button from '../Button/Button'

interface IPagination {
    pageCount: number
    onClick: (selectedPage: number) => void
    defaultValue: number
}
const Pagination = ({
    pageCount,
    onClick,
    defaultValue,
}: IPagination): React.ReactElement => {
    if (pageCount < 2) return <div></div>

    const Text = {
        MAIN: 'Перейти на страницу:',
        SUBMIT: 'Перейти',
        PAGE_COUNT: 'Всего страниц:',
        SELECTED_PAGE: 'Выбранная страница:',
    }
    const startPage = 1
    let $input: HTMLInputElement
    const setRightSelected = (): number => {
        let selected = Number($input.value)
        if (isNaN(selected) || selected < startPage) selected = startPage
        if (selected > pageCount) selected = pageCount
        $input.value = String(selected)
        return selected
    }
    const btnHandler = (event?: React.FormEvent) => {
        if (event) event.preventDefault()
        const selected = setRightSelected()
        onClick(selected)
    }

    return (
        <div>
            <form className={classes.wrapper} onSubmit={btnHandler}>
                <span className={classes.text}>{Text.MAIN}</span>
                <input
                    type='number'
                    min={startPage}
                    max={pageCount}
                    defaultValue={defaultValue}
                    className={classes.choise}
                    ref={(el) => ($input = el)}
                    onBlur={setRightSelected}
                />
                <Button onClick={btnHandler} variant='success'>
                    &#10004;
                </Button>
            </form>
            <div>
                <span className={classes.text}>
                    {Text.SELECTED_PAGE} {defaultValue}
                </span>
            </div>
            <span className={classes.text}>
                {Text.PAGE_COUNT} {pageCount}
            </span>
        </div>
    )
}

export default Pagination
