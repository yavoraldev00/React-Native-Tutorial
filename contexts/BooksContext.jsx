import { createContext, useState } from "react";
import { databases } from "../lib/appwrite";

const DATABASE_ID = process.env.DATABASE_ID
const COLLECTION_NAME = process.env.COLLECTION_NAME

export const BooksContext = createContext()

export function BooksProvider({ children }) {
    const [books, setBooks] = useState([])

    async function fetchBooks() {
        try {

        } catch (error) {
            consoleerror(error.message)
        }
    }

    async function fetchBooksById(id){ 
        try {

        } catch (error) {
            consoleerror(error.message)
        }
    }

    async function createBook(data){ 
        try {

        } catch (error) {
            consoleerror(error.message)
        }
    }

    async function deleteBook(id){ 
        try {

        } catch (error) {
            consoleerror(error.message)
        }
    }

    return (
        <BooksContext.Provider
        value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}>
            {children}
        </BooksContext.Provider>
    )
}