import * as React from 'react'
import { useState, useEffect } from 'react'
import classes from './Searcher.module.sass'
import IconUrl from '../../ui/icon-searcher.svg'

interface ISearcher {
    search: (value: string) => void
    placeholder?: string
    autoSearch: boolean
    autoSearchDelay?: number /* in miliseconds */
}
interface IStyles {
    btn: string
    input: string
}

const Searcher = ({
    search,
    placeholder,
    autoSearch,
    autoSearchDelay,
}: ISearcher): React.ReactElement => {
    const initStyles: IStyles = {
        btn: classes.button,
        input: classes.input,
    }
    const initActiveStyles: IStyles = {
        btn: [classes.button, classes.active].join(' '),
        input: [classes.input, classes.active].join(' '),
    }
    const [styles, setStyles] = useState(initStyles)
    const [value, setValue] = useState('')
    const [dateOfChanges, setDateOfChanges] = useState(null)
    const [searched, setSearched] = useState(true)
    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        search(value)
        setSearched(true)
    }
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateOfChanges(Date.now())
        setValue(event.target.value)
        setSearched(false)
    }

    useEffect(() => {
        if (!autoSearch) return

        const searchDelay = autoSearchDelay || 1000
        let intervalHandlerId = setInterval(() => {
            if (searched) return
            const now = Date.now()
            const prevDate = dateOfChanges
            const timeOfLastChange = now - prevDate
            if (timeOfLastChange > searchDelay) {
                search(value)
                setSearched(true)
            }
        }, searchDelay)

        return () => {
            clearInterval(intervalHandlerId)
        }
    })

    return (
        <form className={classes.wrapper} onSubmit={submitHandler}>
            <input
                type='text'
                className={styles.input}
                placeholder={placeholder || ''}
                onFocus={() => setStyles(initActiveStyles)}
                onBlur={() => setStyles(initStyles)}
                onChange={onChangeHandler}
            />
            <button
                type='submit'
                className={styles.btn}
                onFocus={() => setStyles(initActiveStyles)}
                onBlur={() => setStyles(initStyles)}
            >
                <img src={IconUrl} alt='Поиск' className={classes.icon} />
            </button>
        </form>
    )
}

export default Searcher
