interface IAPI {
    GetBookByISBN: (id: string) => string
    GetBookByLCCN: (id: string) => string
    SearchBooks: (value: string) => string
    GetBookCoverImgByLCCN: (lccn: string, size: string) => string
    GetBookCoverImgByISBN: (isbn: string, size: string) => string
}

const API: IAPI = {
    GetBookByISBN: (ISBN: string) =>
        `https://openlibrary.org/api/books?bibkeys=ISBN:${ISBN}&format=json&jscmd=data`,
    GetBookByLCCN: (LCCN: string) =>
        `https://openlibrary.org/api/books?bibkeys=LCCN:${LCCN}&format=json`,
    SearchBooks: (value: string) =>
        `http://openlibrary.org/search.json?q=${value.split(' ').join('+')}`,
    GetBookCoverImgByLCCN: (lccn: string, size: string) =>
        `http://covers.openlibrary.org/b/lccn/${lccn}-${size}.jpg`,
    GetBookCoverImgByISBN: (isbn: string, size: string) =>
        `http://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`,
}

export default API
