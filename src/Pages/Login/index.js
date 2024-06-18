import React, { useContext, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Animated, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import  { AuthContext } from '../../Context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import Cadastro from "./cadastro/index"


export default function Login({handle}) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cadastro, setCadastro] = useState(false);
 
 // const fade = useRef(new Animated.Value(0)).current;

    // useFocusEffect(
    //     React.useCallback(()=>{
    //         fade.setValue(0);
    //         Animated.timing(fade,{
    //             toValue: 1,
    //             duration: 2000,
    //             useNativeDriver: true
    //         }).start()

    //     },[])
    // )
  const{Login, logado, error,setError} = useContext(AuthContext)

  function RealizarLogin(){
    Login(email,senha)
  };

  return (
     <LinearGradient colors={['black', 'blue', 'black']} style={styles.gradient}>
      <View style={styles.container}>
        {cadastro == false ? 
        <View style={{width: "100%", height: "100%", alignItems:"center", justifyContent: "center"}}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(e) => setEmail(e)}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={(e) => setSenha(e)}
        />
        {error ? <Text style={styles.error}>Revise os campos e tente novamente</Text> : null}
        <TouchableOpacity style={styles.button} onPress={RealizarLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      
    </TouchableOpacity>
        <View style={{display: "flex", flexDirection: "row", gap:10}}>
        <Text style={{color: "white"}}>Ainda não possui cadastro?</Text>
        <TouchableOpacity>
            <Text style={{color: "white"}} onPress={() => setCadastro(true)}>Cadastre-se</Text>
        </TouchableOpacity>
        </View>
        </View>
        :
        <Cadastro handle={setCadastro}/>
        }
      </View> 
     </LinearGradient>

  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex:1,
    flexDirection: "column"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 10,
    width: "80%",
    backgroundColor: 'black',
    padding: 10,
    borderRadius:10
  },
  buttonGradient: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
}); 

