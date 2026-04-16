import { createContext, useEffect, useState } from "react";
import { databases } from "../lib/appwrite";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser"

const DATABASE_ID = "69e096770009a5ab0721"
const COLLECTION_ID = "books"

export const BooksContext = createContext()

export function BooksProvider({ children }) {
    const [books, setBooks] = useState([])
    const { user } = useUser()

    async function fetchBooks() {
        try {
            const response = await databases.listDocuments({
                databaseId: DATABASE_ID,
                collectionId: COLLECTION_ID,
                queries: [
                    Query.equal("userId", user.$id)
                ]
            })

            setBooks(response.documents)
            console.log(response.documents)
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
                collectionId: COLLECTION_ID,
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

    useEffect(() => {

        if (user) {
            fetchBooks()
        } else {
            setBooks([])
        }
    }, [user])

    return (
        <BooksContext.Provider
        value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}>
            {children}
        </BooksContext.Provider>
    )
}