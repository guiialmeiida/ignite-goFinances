import React, {
    createContext,
    ReactNode,
    useContext,
    useState,
} from 'react';

import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);

    async function signInWithGoogle() {
        try {
            const result = await Google.logInAsync({
                iosClientId: '434688394334-p6nv85e347dijkldllp8bd3phc8urp51.apps.googleusercontent.com',
                androidClientId: '434688394334-k0rrb7pleudb14rqso7qqedpgm7g3r7t.apps.googleusercontent.com',
                scopes: ['profile', 'email']
            });

            if (result.type === 'success') {
                const userLogged = {
                    id: String(result.user.id),
                    email: result.user.email!,
                    name: result.user.name!,
                    photo: result.user.photoUrl!
                };

                setUser(userLogged);
                await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged));
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle
        }} >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    return context;
}

export { AuthProvider, useAuth };