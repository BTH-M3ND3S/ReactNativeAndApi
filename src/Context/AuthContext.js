import { createContext, useState } from "react";

export const AuthContext = createContext(0);

    export default function AuthProvider({children})
    {
        const[logado,setLogado] = useState(false)
        const[error,setError] = useState(false)

        async function Login(email,senha){
           await fetch('http://10.139.75.35/api/Usuario/CreateUser',{
            method:'POST',
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify({
                usuarioEmail: email,
                usuarioSenha: senha
            })
        })
            .then(res => res.json())
            .then(setLogado(true))
            .catch(err => setError(true))
           }       
        return(
           <AuthContext.Provider value={{logado: logado, Login, error: error,setError}}>
            {children}
           </AuthContext.Provider>
        )
    }