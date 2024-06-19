import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 
import Home from '../Pages/home/Index.js';
import { AuthContext } from '../Context/AuthContext.js';
import Login from '../Pages/Login/index.js';


const Tab = createBottomTabNavigator();

export default function rotas() {
  const { logado } = useContext(AuthContext);

  if (!logado) {
     return <Login />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: 'black',
            height: 60
          },
          tabBarActiveTintColor:'white'
        }}
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
        

      </Tab.Navigator>
    </NavigationContainer>
  );
}
