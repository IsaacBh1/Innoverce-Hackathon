import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

export const Uselogin = () => {
    const [err, setErr] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
 
    const login = async (email: string, password: string): Promise<void> => {
        setIsLoading(true);
        setErr(false);

        
        try {
            const response = await fetch(`http://localhost:5000/api/login`, {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { 'Content-type': "application/json" },
            });

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setErr(json.error);
                console.log("error")
                return;
            } else {
                 Alert.alert('Login successful!');
                      router.push("/(tabs)");
            }
            

        } catch (error) {
            if (error instanceof Error) {
                setErr(true);
            } else {
                setErr(true);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return { login, isLoading, err }
}