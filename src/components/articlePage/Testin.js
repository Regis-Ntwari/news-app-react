import React from 'react'
import ReactHtmlParser from 'react-html-parser'

export const Testin = () => {
    const hello = "<h1>Hello world</h1>"
    return (
        <div>
            {ReactHtmlParser(hello)}
        </div>
    )
}
