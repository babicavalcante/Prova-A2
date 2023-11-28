import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import { RouterStyle } from '../styles/RouterStyle';
import { NavigationContainer } from '@react-navigation/native';

import AddProfessores from '../screens/AddProfessores';
import AddAlunos from '../screens/AddAlunos'
import Curdos from '../screens/Curdos';
import AddBiblioteca from '../screens/AddBiblioteca';
import Departamento from '../screens/Departamento';

const Stack = createStackNavigator();

export default function Router() {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{ headerStyle: RouterStyle.headerStyle, headerTitleStyle: RouterStyle.headerTitleStyle, headerLeftLabelVisible: false, headerTintColor: 'white' }}>

            <Stack.Screen name="HomeScreen" component={Home} options={{ headerTitle: 'Escola', }} />

            <Stack.Screen name="addProfessores" component={AddProfessores} options={{ headerTitle: '+ Professores', headerStyle: RouterStyle.headerStyleScreen }} />

            <Stack.Screen name="addAlunos" component={AddAlunos} options={{ headerTitle: '+ Alunos', headerStyle: RouterStyle.headerStyleScreen }} />

            <Stack.Screen name="Cursos" component={Curdos} options={{ headerTitle: '+ Cursos', headerStyle: RouterStyle.headerStyleScreen }} />

            <Stack.Screen name="Biblioteca" component={AddBiblioteca} options={{ headerTitle: '+ Livros', headerStyle: RouterStyle.headerStyleScreen }} />

            <Stack.Screen name="Departamento" component={Departamento} options={{ headerTitle: '+ Departamentos', headerStyle: RouterStyle.headerStyleScreen }} />

        </Stack.Navigator>
        </NavigationContainer>
    )
}