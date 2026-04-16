import { createContext, useState } from "react";
import { databases } from "../lib/appwrite";
import { ID, Permission, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser"

const DATABASE_ID = "69e096770009a5ab0721"
const COLLECTION_NAME = "books"

export const BooksContext = createContext()

export function BooksProvider({ children }) {
    const [books, setBooks] = useState([])
    const { user } = useUser()

    async function fetchBooks() {
        try {

        } catch (error) {
            console.log(error.message)
        }
    }

    async function fetchBookById(id){ 
        try {

        } catch (error) {
            console.log(error.message)
        }
    }

    async function createBook(data){ 
        try {
            const newBook = await databases.createDocument({
                databaseId: DATABASE_ID,
                collectionId: COLLECTION_NAME,
                documentId: ID.unique(),
                data: {
                    ...data, userId: user.$id
                },
                permissions: [
                    Permission.read(Role.user(user.$id)),
                    Permission.update(Role.user(user.$id)),
                    Permission.delete(Role.user(user.$id)),
                ]
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    async function deleteBook(id){ 
        try {

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <BooksContext.Provider
        value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}>
            {children}
        </BooksContext.Provider>
    )
}