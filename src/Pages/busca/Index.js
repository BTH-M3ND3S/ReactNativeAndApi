import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, FlatList, Touchable, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function Busca() {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(false);
    const [edicao, setEdicao] = useState(false);
    const [iduser, setIduser] = useState(0);
    const [userNome, setNome] = useState();
    const [userEmail, setEmail] = useState();
    const [userSenha, setSenha] = useState();
    const [userTelefone, setTelefone ] = useState();
    const [deleteResposta, setResposta] = useState(false);

    async function getUsuarios() {
        await fetch('http://10.139.75.35/api/Usuario/GetAllUsers', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => setUsuarios(json))
            .catch(err => setError(true));
    }

    async function getUsuario(id) {
        console.log(id)
        await fetch('http://10.139.75.35/api/Usuario/GetUserId/' + id, {
            method: 'GET',
            headers: {
                'content-type': 'application/json; charset-UTF-8',
            },
        })
            .then((response) => response.json())
            .then(json => {
                setIduser(json.usuarioId);
                setNome(json.usuarioNome);
                setEmail(json.usuarioEmail);
                setSenha(json.usuarioSenha);
                setTelefone(json.usuarioTelefone)
            });
    }

    async function editUser() {
        console.log(iduser);
        await fetch('http://10.139.75.35/api/Usuario/UpdateUser/' + iduser, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json; charset-UTF-8',
            },
            body: JSON.stringify({
                usuarioId: iduser,
                usuarioEmail: userEmail,
                usuarioSenha: userSenha,
                usuarioNome: userNome,
                usuarioTelefone: userTelefone
            })
        })
            .then((response) => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err));
        getUsuarios();
        setEdicao(false);
    }

    function showAlert(id, userName) {
        Alert.alert(
            '',
            'Deseja realmente excluir esse usuário?',
            [
                { text: "Sim", onPress: () => deleteUsuario(id, userName) },
                { text: "Não", onPress: () => ('') },
            ],
            { cancelable: false }
        );
    }

    async function deleteUsuario(id, userName) {
        await fetch('http://10.139.75.35/api/Usuario/DeleteUsuario/' + id, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())
            .then(json => setResposta(json))
            .catch(err => setError(true));

        if (deleteResposta == true) {
            Alert.alert(
                '',
                'Usuário ' + userName + 'excluído com sucesso',
                [
                    { text: '', onPress: () => ('') },
                    { text: 'Ok', onPress: () => ('') },
                ],
                { cancelable: false }
            );
            getUsuarios();
        }
        else {
            Alert.alert(
                '',
                'Usuário ' + userName + 'não foi excluído',
                [
                    { text: '', onPress: () => ('') },
                    { text: 'Ok', onPress: () => ('') },
                ],
                { cancelable: false }
            );
            getUsuarios();

        }
    };

    useEffect(() => {
        getUsuarios();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            getUsuarios();
        }, [])
    );

    return (
        <View style={styles.container}>
            {edicao == false ?
                <FlatList
                    style={styles.flat}
                    data={usuarios}
                    keyExtractor={(item) => item.usuarioId}
                    renderItem={({ item }) => (
                        <>
                            <Text style={{color: "white"}}>Nome:{item.usuarioNome}</Text>
                            <Text style={{color: "white"}}>Email:{item.usuarioEmail}</Text>
                            <Text style={{color: "white"}}>Senha:{item.usuarioSenha}</Text>
                            <Text style={{color: "white"}}>Telefone:{item.usuarioTelefone}</Text>
                        <Text style={styles.text}>         
                            <TouchableOpacity style={styles.btnEdit} onPress={() => { setEdicao(true); getUsuario(item.usuarioId) }}>
                                <Text style={styles.btnLoginText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnDelete} onPress={() => showAlert(item.usuarioId, item.usuarioNome)}>
                                <Text style={styles.btnLoginText}>Excluir</Text>
                            </TouchableOpacity>
                        </Text>
                        </>
                    )}
                />
                :
                <View style={styles.editar}>
                    <TextInput
                        inputMode="text"
                        style={styles.input}
                        value={userNome}
                        onChangeText={(digitado) => setNome(digitado)}
                        placeholderTextColor='white'
                    />
                    <TextInput
                        inputMode="email"
                        style={styles.input}
                        value={userEmail}
                        onChangeText={(digitado) => setEmail(digitado)}
                        placeholderTextColor='white'
                    />
                    <TextInput
                        inputMode="text"
                        secureTextEntry={true}
                        style={styles.input}
                        value={userSenha}
                        onChangeText={(digitado) => setSenha(digitado)}
                        placeholderTextColor='white'
                    />
                    <TextInput
                        inputMode="text"
                        style={styles.input}
                        value={userTelefone}
                        onChangeText={(digitado) => setTelefone(digitado)}
                        placeholderTextColor='white'
                    />
                    <TouchableOpacity style={styles.btnCreate} onPress={() => editUser()}>
                        <Text style={styles.btnLoginText}>SALVAR</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#191919',
    },
    text: {
        padding: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#ecf0f1',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btnEdit: {
        backgroundColor: '#27ae60',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    btnDelete: {
        backgroundColor: '#e74c3c',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    btnLoginText: {
        color: '#ecf0f1',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    editar: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#ecf0f1',
        borderRadius: 10,
    },
    input: {
        height: 45,
        borderColor: '#bdc3c7',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        color: '#191919',
    },
    btnCreate: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
});