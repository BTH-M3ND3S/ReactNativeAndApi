import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../Context/AuthContext';

export default function Login({ handle }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cadastro, setCadastro] = useState(false);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(false);
  const { Login, error, setError } = useContext(AuthContext);

  function RealizarLogin() {
    Login(email, senha);
  }

  async function handleCadastro() {
    if (senha !== confirmSenha) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      const response = await fetch('http://10.139.75.35/api/Usuario/CreateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuarioNome: nome,
          usuarioEmail: email,
          usuarioTelefone: telefone,
          usuarioSenha: senha
        }),
      });

      const data = await response.json();
      if (data) {
        console.log('Nova observação:', data);
        setSucesso(true);
        setCadastro(false);
        limparCampos();
        Alert.alert('Sucesso', 'Observação cadastrada com sucesso!');
      } else {
        setErro(true);
        Alert.alert('Erro', 'Falha ao cadastrar observação.');
      }
    } catch (error) {
      setErro(true);
      Alert.alert('Erro', 'Erro de rede');
    }
  }

  function limparCampos() {
    setNome('');
    setEmail('');
    setTelefone('');
    setSenha('');
    setConfirmSenha('');
    setErro(false);
    setSucesso(false);
    setError('');
  }

  return (
    <LinearGradient colors={['black', 'blue', 'black']} style={styles.gradient}>
      <View style={styles.container}>
        {!cadastro ? (
          <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
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
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={RealizarLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <Text style={{ color: "white" }}>Ainda não possui cadastro?</Text>
              <TouchableOpacity onPress={() => setCadastro(true)}>
                <Text style={{ color: "white" }}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.title}>Cadastro</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={nome}
              onChangeText={(e) => setNome(e)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(e) => setEmail(e)}
            />
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              value={telefone}
              onChangeText={(e) => setTelefone(e)}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              value={senha}
              onChangeText={(e) => setSenha(e)}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar Senha"
              secureTextEntry
              value={confirmSenha}
              onChangeText={(e) => setConfirmSenha(e)}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCadastro(false)}>
              <Text style={{ color: 'white', marginTop: 10 }}>Cancelar</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
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
    borderRadius: 10
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
