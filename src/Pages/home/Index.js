import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, FlatList, StatusBar,Animated } from 'react-native';
import Animal from './components/Animais';
import { useFocusEffect } from '@react-navigation/native';

export default function Index({nome, raca, tipo, cor, sexo, foto, dtDesaparecimento, dtEncontro,Status, UsuarioId}) {

    const[ animais,setAnimais] = useState([])
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

    async function getAnimais(){
      await fetch('http://10.139.75.35/api/Animais/GetAllAnimals',{
        method:'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => (res.ok == true) ? res.json() : false)
        .then(json=> setAnimais( json ))
        .catch(err => setError(true))
    }

    useEffect(()=> {
      getAnimais();
    }, [])

    return(
      <View style={{backgroundColor: "black"}}>
       
        <StatusBar/>
        {animais.length > 0 ?
         <Animated.View style={{opacity: fade}}>
        <FlatList
        data={animais}
        renderItem={({item}) =><Animal nome={item.animalNome} raca={item.animalRaca}  tipo={item.animalTipo} cor={item.animalCor} sexo={item.animalSexo} foto={item.animalFoto} dtDesaparecimento={item.animalDtDesaparecimento} dtEncontro={item.animalDtEncontro} Status={item.animalStatus} UsuarioId={item.usuarioId}/>}
        keyExtractor={(item) => item.animalId}
        />
        </Animated.View>
        :<ActivityIndicator/>
      }
      </View>
    );
}