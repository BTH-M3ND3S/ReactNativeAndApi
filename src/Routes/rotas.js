import React, { useContext } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 
import Home from '../Pages/home/Index.js';
import Busca from '../Pages/busca/Index.js';
import { AuthContext } from '../Context/AuthContext.js';
import Login from '../Pages/Login/index.js';
import Inserir from '../Pages/Inserir/index.js';


const Tab = createMaterialBottomTabNavigator();

export default function rotas() {
  const { logado } = useContext(AuthContext);

  if (!logado) {
    // return <Login />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="blue"
        inactiveColor="gray"
        barStyle={{ backgroundColor: 'white', height: 63 }}
        >
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarIcon:({ color }) => (
              <MaterialIcons  name="home" size={30} color={color}/> 
            ),
          }}
        />
        <Tab.Screen
          name="Inserir"
          component={Inserir}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons  name="home" size={30} color={color} /> 
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
