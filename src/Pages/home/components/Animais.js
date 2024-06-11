import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';

export default function Animais({ nome, raca, tipo, cor, sexo, foto, dtDesaparecimento, dtEncontro, Status, UsuarioId }) {
  const formattedDtDesaparecimento = moment(dtDesaparecimento).format('DD/MM/YYYY');
  const formattedDtEncontro = moment(dtEncontro).format('DD/MM/YYYY');


    return (
      <View style={styles.container}>
        <View style={styles.productInfo}>
          <Text style={styles.title}>Nome Do Animal:</Text>
          <Text style={styles.title}>{nome}</Text>
          <Image source={{ uri: foto }} style={styles.image} />
          <Text style={styles.price}>raça:{raca}</Text>
          <Text style={styles.category}>Tipo: {tipo}</Text>
          <Text style={styles.category}>Cor: {cor}</Text>
          <Text style={styles.description}>sexo: {sexo}</Text>
          <Text style={styles.description}>Data de Desaparecimento: {formattedDtDesaparecimento}</Text>
          <Text style={styles.description}>Data de Encontro do animal: {formattedDtEncontro}</Text>
          <Text style={styles.description}>Status do animal: {Status}</Text>
          <Text style={styles.description}>UsuarioId: {UsuarioId}</Text>
        </View>

      </View>
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  price: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    objectFit: 'contain',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
});

