import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Observacao({ handle2 }) {
  const [observacaoDescricao, setObservacaoDescricao] = useState('');
  const [observacaoLocal, setObservacaoLocal] = useState('');

  function  handleSubmit() {
    // Aqui você pode enviar os dados para a API
    const novaObservacao = {
      observacaoDescricao,
      observacaoLocal,
      observacaoData: new Date().toISOString(), // Define a data atual
      animalId: 0, // Insira o ID do animal correspondente
      usuarioId: 0 // Insira o ID do usuário correspondente
    };
    console.log('Nova observação:', novaObservacao);
    handle2(false);
  };

  return (
    <View style={styles.container}>
        <View style={styles.box}>
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
    flex: 1,
    padding: 16
  },
  box: {
    width:'100%',
    height: '100%',
    marginTop: 40,
    alignItems: 'center'
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
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
    backgroundColor: '#3e2465',
    borderRadius: 5,
    paddingVertical: 12,
    marginTop: 10,
    height: 50,
    width: '90%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
