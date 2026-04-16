import { createContext, useEffect, useState } from "react";
import { databases, client } from "../lib/appwrite";
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
            const response = await databases.getDocument({
                databaseId: DATABASE_ID,
                collectionId: COLLECTION_ID,
                documentId: id
            })

            return response
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
        let unsubscribe
        const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`

        debugger;

        if (user) {
            fetchBooks()

            unsubscribe = client.subscribe(channel, (response) => {
                const { payload, events } = response
                console.log(events)

                if (events[0].includes("create")) {
                    setBooks((prevBooks) => [...prevBooks, payload])
                }
            })
        } else {
            setBooks([])
        }

        return () => {
            if (unsubscribe) unsubscribe()
        }
    }, [user])

    return (
        <BooksContext.Provider
        value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}>
            {children}
        </BooksContext.Provider>
    )
}