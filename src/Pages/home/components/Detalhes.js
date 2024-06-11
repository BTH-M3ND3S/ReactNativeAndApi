import React from 'react';
import  { useEffect, useState, useRef, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../../Context/AuthContext';

export default function Animais({ handle, animal }) {
  const formattedDtDesaparecimento = moment(animal.animaldtDesaparecimento).format('DD/MM/YYYY');
  const formattedDtEncontro = moment(animal.animaldtEncontro).format('DD/MM/YYYY');
  const fade = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      fade.setValue(0);
      Animated.timing(fade, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      }).start()
    }, [])
  )
  return (
    <Animated.View style={{ opacity: fade }}>
    <View style={styles.container}>
      <View style={styles.productInfo}>
        <Text style={styles.title}>Nome: {animal.animalNome}</Text>
        <Image source={{ uri:  animal.animalFoto}} style={styles.image} />
        <Text style={styles.info}>Raça: {animal.animalRaca} </Text>
        <Text style={styles.info}>Tipo: {animal.animalTipo}</Text>
        <Text style={styles.info}>Cor: {animal.animalCor}</Text>
        <Text style={styles.info}>Sexo: {animal.animalSexo}</Text>
        <Text style={styles.info}>Data de Desaparecimento: {formattedDtDesaparecimento}</Text>
        <Text style={styles.info}>Data de Encontro do Animal: {formattedDtEncontro}</Text>
        <Text style={styles.info}>Status do Animal: {animal.animalStatus}</Text>
        <Text style={styles.info}>UsuarioId: {animal.usuarioId}</Text>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => handle(false)}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Criar observação</Text>
      </TouchableOpacity>
    </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: "100%"
  },
  productInfo: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: '#3e2465',
    borderRadius: 5,
    paddingVertical: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
