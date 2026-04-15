import { Stack } from "expo-router";
import { StatusBar } from "react-native"
import { useUser } from "../../hooks/UseUser";

export default function AuthLayout() {

    const { user } = useUser()
    console.log(user)

    return (
        <>
            <StatusBar style="auto" />
            <Stack
              screenOptions={{ headerShown: false, animation: "none" }}
            />
        </>
    )
}