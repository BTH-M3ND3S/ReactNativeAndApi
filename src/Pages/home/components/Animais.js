import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';

export default function Animais({ nome, raca, tipo, cor, sexo, foto, dtDesaparecimento, dtEncontro, Status, UsuarioId }) {
  const formattedDtDesaparecimento = moment(dtDesaparecimento).format('DD/MM/YYYY');
  const formattedDtEncontro = moment(dtEncontro).format('DD/MM/YYYY');
  const[ isValid, setValid ] = useState(false);


  async function getLink() {
    await fetch( foto ).then( res => setValid( true) ).catch( err => setValid( false ) );
  }

  useEffect( () => {
    getLink();
  }, [] );

  return (
    <View style={styles.container}>
      <View style={styles.productInfo}>
        <Text style={styles.title}>{nome}</Text>
        { isValid ?
          <Image source={{ uri: foto }} style={styles.image} />
          :
        <View style={{    width: '100%',height: 200, alignItems: "center", justifyContent: "center", backgroundColor: "white"}}>
          <Text> Sem Foto </Text>
        </View>
        }
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3e2465',
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    width: 330,
    marginLeft: 5,
  },
  productInfo: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    color: 'white',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    objectFit: 'contain',
  },
});

