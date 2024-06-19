import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../../../Context/AuthContext';

export default function Observacao({ handle2, animal2 }) {
  const [observacaoDescricao, setObservacaoDescricao] = useState('');
  const [observacaoLocal, setObservacaoLocal] = useState('');
  const [observacaoData, setObservacaoData] = useState('');
  const [animalId, setAnimalId] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(false);

  const {usuarioId, usuarioNome} = useContext(AuthContext);

  async function handleSubmit() {

    const dataFormatada = formatarData(observacaoData);

    await fetch('http://10.139.75.35/api/Observacoes/CreateObservacao', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        observacaoDescricao: observacaoDescricao,
        observacaoLocal: observacaoLocal,
        observacaoData: dataFormatada, 
        animalId: animal2.animalId,
        usuarioId: usuarioId
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data) {
        console.log('Nova observação:', data);
        setSucesso(true);
        handle2(false);
        limparCampos();
        Alert.alert('Sucesso', 'Observação cadastrada com sucesso!');
      } else {
        setErro(true);
        Alert.alert('Erro', 'Falha ao cadastrar observação.');
      }
    })
    .catch(err => {
      console.error('Erro:', err);
      setErro(true);
    });
  }

  function formatarData(data) {
    const partes = data.split('/');
    if (partes.length === 3) {
      const dia = partes[0];
      const mes = partes[1];
      const ano = partes[2];
      return `${ano}-${mes}-${dia}`;
    }
    return data;
  }

  function limparCampos() {
    setObservacaoDescricao('');
    setObservacaoLocal('');
    setObservacaoData('');
    setAnimalId('');
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.box}>
        <Text>{animal2.animaNome}</Text>
        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setObservacaoDescricao(text)}
          value={observacaoDescricao}
          placeholder="Descreva a observação"
        />
        <Text style={styles.label}>Local:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setObservacaoLocal(text)}
          value={observacaoLocal}
          placeholder="Informe o local da observação"
        />
        <Text style={styles.label}>Data:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setObservacaoData(text)}
          value={observacaoData}
          placeholder="dd/mm/yyyy"
        />
        <Text style={styles.label}>Animal:</Text>
        <Text style={styles.input}>Id: {animal2.animalId}</Text>
        <Text style={styles.input}>Nome: {animal2.animalNome}</Text>
        <Text style={styles.label}>Usuário:</Text>
        <Text style={styles.input}>Id: {usuarioId}</Text>
        <Text style={styles.input}>Nome: {usuarioNome}</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Salvar Observação</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => handle2(false)}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: "100%",
    width: "100%"
  },
  box: {
    width: '100%',
    height: '100%',
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: "white",
     position: "absolute"
  },
  label: {
    fontSize: 16,
  },
  input: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 12,
    marginTop: 10,
    height: 50,
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
