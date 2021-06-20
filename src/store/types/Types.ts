type TAction = {
    type: string
    payload?: any
}

type TBook = {
    title: string
    img_m: string
    img_l: string
    author: string[]
    publicationDate: string[]
    publisher: string[]
    ISBN?: string[]
    LCCN?: string[]
}

export { TAction, TBook }
