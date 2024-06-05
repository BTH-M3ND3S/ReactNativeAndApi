import React, { useState,useRef } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert,Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function Inserir() {
    const [usuarioId, setUsuarioId] = useState(0);
    const [email, setEmail] = useState('');
    const [nomeDeUsuario, setNomeDeUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [usuarioTelefone, setUsuarioTelefone] = useState('');
    const[erro,setErro] = useState(false)
    const[sucesso, setSucesso] = useState(false)

    const fade = useRef(new Animated.Value(0)).current;

    useFocusEffect(
        React.useCallback(()=>{
            fade.setValue(0);
            Animated.timing(fade,{
                toValue: 1,
                duration: 2000,
                useNativeDriver: true
            }).start()

        },[])
    )
    

    async function RealizarCadastro(){
        if (!email || !nomeDeUsuario || !senha || !usuarioTelefone) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            setErro(true)
            return;
        }
        await fetch('http://10.139.75.35/api/Usuario/CreateUser',{
            method:"POST",
            body:JSON.stringify(
                {
                    usuarioId: usuarioId,
                    usuarioNome: nomeDeUsuario,
                    usuarioEmail: email,
                    usuarioTelefone: usuarioTelefone,
                    usuarioSenha: senha     
                }
            )
        })
        .then(res => (res.ok == true) ? res.json() : false)
        .then(json=> {json.usuarioId ? setSucesso(true) : setErro(true) })
        .catch(err => setErro(true))

        setEmail('');
        setNomeDeUsuario('');
        setSenha('');
        setUsuarioTelefone('');
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    };

    return (
        <Animated.View style={{opacity: fade}}>
        <ScrollView contentContainerStyle={styles.container}>
            {sucesso ? 
            <Text>Obrigado por se cadastrar. Cadastro realizado com sucesso!</Text> 
            : 
            <>
            <Text style={styles.title}>Cadastro</Text>
            <TextInput
                style={styles.input}
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder='Nome de usuário'
                value={nomeDeUsuario}
                onChangeText={setNomeDeUsuario}
            />
            <TextInput
                style={styles.input}
                placeholder='Senha'
                secureTextEntry={true}
                value={senha}
                onChangeText={setSenha}
            />
            <TextInput
                style={styles.input}
                placeholder='Telefone'
                value={usuarioTelefone}
                onChangeText={setUsuarioTelefone}
            />
            <TouchableOpacity style={styles.button} onPress={RealizarCadastro}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            </>}
        </ScrollView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    button: {
        width: '100%',
        backgroundColor: '#007bff',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
