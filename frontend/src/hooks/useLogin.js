import {useState} from 'react'
import {useAuthContext} from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
       

        try {
            console.log("Response text before parsing:", response); 
            const json = await response.json()
    
            if (!response.ok) {
                setIsLoading(false)
                setError(json.error)
            } else {
                // save the user to localStorage
                localStorage.setItem('user', JSON.stringify(json))
                // update the auth context
                dispatch({type: 'LOGIN', payload: json})
                setIsLoading(false)
            }
        } catch (error) {
            console.error("Error parsing JSON:", error);
            console.log("Server response:", response)
            setIsLoading(false);
            setError("Error parsing server response");
        }
    }
    return { login, isLoading, error}
}