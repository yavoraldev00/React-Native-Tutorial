import { Client, Account, Avatars } from "react-native-appwrite";

const client = new Client()
	.setPorject(``)
	.setEndpoint(``)

export const account = new Account(client)
export const avatars = new Avatars(client)