import React from 'react';
import { useEffect, useState, useRef, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, ScrollView } from 'react-native';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import Observacao from './Observacao';

export default function Animais({ handle, animal, handle2 }) {
  const formattedDtDesaparecimento = moment(animal.animaldtDesaparecimento).format('DD/MM/YYYY');
  const formattedDtEncontro = moment(animal.animaldtEncontro).format('DD/MM/YYYY');
  const fade = useRef(new Animated.Value(0)).current;
  const[animal2, setAnimal2] = useState()

  const [criaobs, setCriaObs] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      fade.setValue(0);
      Animated.timing(fade, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      }).start()
    }, [])
  );
  function criarobservação(item) {
    setCriaObs(true)
    setAnimal2(item)
  }

  return (
    <Animated.View style={{ opacity: fade }}>
      {criaobs == false ?
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.productInfo}>
            <Text style={styles.title}>Nome: {animal.animalNome}</Text>
            <Image source={{ uri: animal.animalFoto }} style={styles.image} />
            <Text style={styles.info}><Text style={styles.bold}>Raça:</Text> {animal.animalRaca}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Tipo:</Text> {animal.animalTipo}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Cor:</Text> {animal.animalCor}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Data de Desaparecimento:</Text> {formattedDtDesaparecimento}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Data de Encontro do Animal:</Text> {formattedDtEncontro}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Status do Animal:</Text> {animal.animalStatus}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Observacao do animal::</Text> {animal.animalObservacao}</Text>
            <Text style={styles.info}><Text style={styles.bold}>UsuarioId:</Text> {animal.usuarioId}</Text>
          </View>
          <View style={{ marginTop: 130 }}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => handle(false)}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => criarobservação(animal)}>
              <Text style={styles.buttonText}>Criar observação</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
        :
        <Observacao handle2={setCriaObs} usuario={animal.usuarioId} animal2={animal2} />
      }
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
    height: "97.5%",
  },
  productInfo: {
    alignItems: 'left',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  info: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: 'blue',
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
