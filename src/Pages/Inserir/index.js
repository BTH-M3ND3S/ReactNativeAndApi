import React, { useState, useRef } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function Inserir() {
    const [animalId, setAnimalId] = useState(0);
    const [ animalStatus, setAnimalStatus] = useState(1)
    const [animalNome, setAnimalNome] = useState('');
    const [animalRaca, setAnimalRaca] = useState('');
    const [animalTipo, setAnimalTipo] = useState('');
    const [animalCor, setAnimalCor] = useState('');
    const [animalSexo, setAnimalSexo] = useState('');
    const [animalFoto, setAnimalFoto] = useState('');
    const [animalDtDesaparecimento, setAnimalDtDesaparecimento] = useState('');
    const [animalDtEncontro, setAnimalDtEncontro] = useState('');
    const [usuarioId, setUsuarioId] = useState('');
    const [erro, setErro] = useState(false);
    const [sucesso, setSucesso] = useState(false);

    const fade = useRef(new Animated.Value(0)).current;

    useFocusEffect(
        React.useCallback(() => {
            fade.setValue(0);
            Animated.timing(fade, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true
            }).start();
        }, [])
    );

    async function RealizarCadastro() {
        if (!animalNome || !animalRaca || !animalTipo || !animalCor || !animalSexo || !animalDtDesaparecimento || !animalDtEncontro || !usuarioId) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            setErro(true);
            return;
        }
        await fetch('http://10.139.75.35/api/Animais/CreateAnimals', {
            method: "POST",
            body: JSON.stringify({
                animalId: animalId,
                animalNome: animalNome,
                animalRaca: animalRaca,
                animalTipo: animalTipo,
                animalCor: animalCor,
                animalSexo: animalSexo,
                animalFoto: animalFoto,
                animalStatus: animalStatus,
                animalDtDesaparecimento: animalDtDesaparecimento,
                animalDtEncontro: animalDtEncontro,
                usuarioId: usuarioId
            })
        })
        .then(res => (res.ok == true) ? res.json() : false)
        .then(json => {json.animalId ? setSucesso(true) : setErro(true) })
        .catch(err => setErro(true));

        setAnimalNome('');
        setAnimalRaca('');
        setAnimalTipo('');
        setAnimalCor('');
        setAnimalSexo('');
        setAnimalFoto('');
        setAnimalDtDesaparecimento('');
        setAnimalDtEncontro('');
        setUsuarioId('');
        Alert.alert('Sucesso', 'Cadastro de animal realizado com sucesso!');
    }

    return (
        <Animated.View style={{ opacity: fade }}>
            <ScrollView contentContainerStyle={styles.container}>
                {sucesso ? (
                    <Text>Obrigado por cadastrar o animal. Cadastro realizado com sucesso!</Text>
                ) : (
                    <>
                        <Text style={styles.title}>Cadastro de Animal</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Nome do Animal'
                            value={animalNome}
                            onChangeText={setAnimalNome}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Raça'
                            value={animalRaca}
                            onChangeText={setAnimalRaca}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Tipo'
                            value={animalTipo}
                            onChangeText={setAnimalTipo}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Cor'
                            value={animalCor}
                            onChangeText={setAnimalCor}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Sexo'
                            value={animalSexo}
                            onChangeText={setAnimalSexo}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Data de Desaparecimento'
                            value={animalDtDesaparecimento}
                            onChangeText={setAnimalDtDesaparecimento}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Data de Encontro'
                            value={animalDtEncontro}
                            onChangeText={setAnimalDtEncontro}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='ID do Usuário'
                            keyboardType='numeric'
                            value={usuarioId}
                            onChangeText={text => setUsuarioId(text)}
                        />
                        <TouchableOpacity style={styles.button} onPress={RealizarCadastro}>
                            <Text style={styles.buttonText}>Cadastrar</Text>
                        </TouchableOpacity>
                    </>
                )}
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
