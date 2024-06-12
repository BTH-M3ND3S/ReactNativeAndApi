import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, FlatList, StatusBar, Animated } from 'react-native';
import Animal from './components/Animais';
import { useFocusEffect } from '@react-navigation/native';
import Detalhes from "./components/Detalhes"
import { AuthContext } from '../../Context/AuthContext';


export default function Index() {

  const [animais, setAnimais] = useState([])
  const fade = useRef(new Animated.Value(0)).current;
  const { detalhes, setDetalhes } = useContext(AuthContext);
  const [ animal, setAnimal ] = useState();
  const [ link, setLink ] = useState([]);

  const animaisFiltrados = animais.filter(animal => animal.animalStatus === 1)

  function exibirDetalhesDoAnimal(item){
    setDetalhes(true);
    setAnimal( item );
  }

  useFocusEffect(
    React.useCallback(() => {
      getAnimais();
      fade.setValue(0);
      Animated.timing(fade, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      }).start();
      
    }, [])
  )

  async function getAnimais() {
    await fetch('http://10.139.75.35/api/Animais/GetAllAnimals', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => (res.ok == true) ? res.json() : false)
      .then(json => {
        setAnimais(json);
      })
      .catch(err => setError(true))
  }
  
  
  useEffect(() => {
    getAnimais();
  }, [])

  return (
    <View style={{ backgroundColor: "black" }}>
      
      <StatusBar />
      {detalhes == false ?
        <>
          {animaisFiltrados.length > 0 ?
            <Animated.View style={{ opacity: fade }}>
              <FlatList
                data={animaisFiltrados}
                renderItem={({ item }) => (
                  <View style={styles.Container}>
                    <Animal nome={item.animalNome} 
                  foto={item.animalFoto}/>
                    <TouchableOpacity style={styles.button} onPress={() => exibirDetalhesDoAnimal(item)}>
                      <Text style={styles.buttonText}>Ver Detalhes</Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item) => item.animalId}              

              />   
            </Animated.View>
            : <ActivityIndicator />
          }
        </>
        :
        <Detalhes  handle={setDetalhes} animal={animal}  />
        
      }
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  Container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#3e2465',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

