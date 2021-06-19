import * as React from 'react'
import { useState, useEffect } from 'react'
import classes from './Searcher.module.sass'
import IconUrl from '../../ui/icon-searcher.svg'
import Button from '../Button/Button'

interface ISearcher {
    search: (value: string) => void
    placeholder?: string
    autoSearch: boolean
    autoSearchDelay?: number /* in miliseconds */
}

const Searcher = ({
    search,
    placeholder,
    autoSearch,
    autoSearchDelay,
}: ISearcher): React.ReactElement => {
    const initInputClasses: string[] = [classes.input]
    const initBtnClasses: string[] = [classes.button]
    const [InputClasses, setInputClasses] = useState(initInputClasses)
    const [BtnClasses, setBtnClasses] = useState(initBtnClasses)
    const [value, setValue] = useState('')
    const [dateOfChanges, setDateOfChanges] = useState(null)
    const [searched, setSearched] = useState(false)
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
                className={InputClasses.join(' ')}
                placeholder={placeholder || ''}
                onFocus={() => {
                    setInputClasses([classes.input, classes.active])
                    setBtnClasses([classes.button, classes.active])
                }}
                onBlur={() => {
                    setInputClasses(initInputClasses)
                    setBtnClasses(initBtnClasses)
                }}
                onChange={onChangeHandler}
            />
            <button
                type='submit'
                className={BtnClasses.join(' ')}
                onFocus={() => {
                    setInputClasses([classes.input, classes.active])
                    setBtnClasses([classes.button, classes.active])
                }}
                onBlur={() => {
                    setInputClasses(initInputClasses)
                    setBtnClasses(initBtnClasses)
                }}
            >
                <img src={IconUrl} alt='Поиск' className={classes.icon} />
            </button>
        </form>
    )
}

export default Searcher
