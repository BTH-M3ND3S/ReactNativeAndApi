import { createContext, useState } from "react";

export const AuthContext = createContext(0);

    export default function AuthProvider({children})
    {
        const[logado,setLogado] = useState(false)
        const[error,setError] = useState(false)
        const[ isValid2, setValid2 ] = useState(false);

        const[detalhes, setDetalhes] = useState(false);

        async function Login(email,senha){
          if(email != "" && senha != ""){  
           await fetch('http://10.139.75.35/api/Usuario/Login',{
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
            .then(json => {
                if(json.usuarioId){
                    setLogado(true)
                } else {
                    setError(true)
                }
            }
        )
        .catch(err => setError(true))
    }else {
        setError(true)
    }
           }       
        return(
           <AuthContext.Provider value={{ logado: logado, Login, error: error,setError, detalhes: detalhes, setDetalhes, isValid: isValid2, setValid2 }}>
            {children}
           </AuthContext.Provider>
        )
    }