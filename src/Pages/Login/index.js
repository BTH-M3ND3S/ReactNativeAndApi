import React, { useContext, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Animated, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import  { AuthContext } from '../../Context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';


export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
 
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
   
    // <LinearGradient colors={['#3e2465', '#555555', '#3e2465']} style={styles.gradient}>
    //    <Animated.View style={{opacity: fade}}>
      <ScrollView style={styles.container}>
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
            <Text style={{color: "white"}}>Cadastre-se</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    //   </Animated.View>
    // </LinearGradient>

  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
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
    backgroundColor: '#3e2465',
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

