import * as React from 'react'
import classes from './BookSearcher.module.sass'
import BookItem from '../../components/BookItem/BookItem'
import BookSnippet from '../../components/BookSnippet/BookSnippet'
import Pagination from '../../components/Pagination/Pagination'
import Searcher from '../../components/Searcher/Searcher'
import { connect } from 'react-redux'
import { TBook } from '../../store/types/Types'
import * as Actions from '../../store/actions/Books'
import ModalBackdrop from '../../components/ModalBackdrop/ModalBackdrop'
import Loading from '../../components/Loading/Loading'
import IconClose from '../../ui/icon-close.svg'
import _ from 'lodash'

interface IBookList {
    books: TBook[]
    booksLoading: boolean
    search: (value: string) => void
    errorSearchingBooks: boolean
}

const BookSearcher = ({
    books,
    booksLoading,
    search,
    errorSearchingBooks,
}: IBookList): React.ReactElement => {
    const TEXT = {
        ERROR_SEARCHING: 'Ошибка при загрузке. Попробуйте позже',
        BOOKS_FOUNDED: 'Всего книг найдено:',
    }
    const [selectedBook, setSelectedBook] = React.useState(null)
    const [SelectedPage, SetSelectedPage] = React.useState(1)
    const countPageElements = 12
    const pageCount = Math.ceil(books.length / countPageElements)
    const BooksFounded = books.length
    const PreSearchHandler = (value: string) => {
        SetSelectedPage(1)
        search(value)
    }
    const HandlerHiddenBookModal = () => setSelectedBook(null)
    const getSelectedBookParams = () => [
        {
            title: 'Авторы',
            value: selectedBook?.author,
        },
        {
            title: 'Дата публикации',
            value: selectedBook?.publicationDate,
        },
        {
            title: 'Издатели',
            value: selectedBook?.publisher,
        },
        {
            title: 'ISBN',
            value: selectedBook?.ISBN,
        },
    ]
    const getBooksPage = () =>
        books
            .slice(
                (SelectedPage - 1) * countPageElements,
                (SelectedPage - 1) * countPageElements + countPageElements
            )
            .map((book: TBook) => (
                <BookSnippet
                    key={_.uniqueId()}
                    title={book.title}
                    author={book.author}
                    urlImg={book.img_m}
                    onClick={() => setSelectedBook(book)}
                />
            ))

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <Searcher
                    search={PreSearchHandler}
                    placeholder='Введите название'
                    autoSearchDelay={1000}
                    autoSearch={true}
                />
            </div>
            <span className={classes.text}>
                {TEXT.BOOKS_FOUNDED} {BooksFounded}
            </span>
            <div className={classes.books}>
                {errorSearchingBooks ? (
                    <span className={classes.text}>{TEXT.ERROR_SEARCHING}</span>
                ) : (
                    getBooksPage()
                )}
                <ModalBackdrop open={booksLoading}>
                    <Loading />
                </ModalBackdrop>
            </div>
            <Pagination
                pageCount={pageCount}
                onClick={(page: number) => SetSelectedPage(page)}
                defaultValue={SelectedPage}
            />
            <ModalBackdrop
                open={!_.isNull(selectedBook)}
                onClick={HandlerHiddenBookModal}
                position='fixed'
            >
                <div className={classes.modal}>
                    <div className={classes.modalCloseBtnWrapper}>
                        <div
                            onClick={HandlerHiddenBookModal}
                            className={classes.modalCloseBtn}
                            style={{ backgroundImage: `url(${IconClose})` }}
                        />
                    </div>
                    <BookItem
                        imgUrl={selectedBook?.img_l}
                        title={selectedBook?.title}
                        params={getSelectedBookParams()}
                    />
                </div>
            </ModalBackdrop>
        </div>
    )
}

const mapState = (state: any) => ({
    booksLoading: state.books.booksLoading,
    books: state.books.books,
    errorSearchingBooks: state.books.errorSearchingBooks,
})

const mapDispatch = {
    search: Actions.searchBooks,
}

export default connect(mapState, mapDispatch)(BookSearcher)
