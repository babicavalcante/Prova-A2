import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInputMask } from 'react-native-masked-text'
import Toast from 'react-native-toast-message'
import AddBibliotecaStyle from '../styles/AddBibliotecaStyle'
import { Global } from '../styles/Global'
import GerarIdÚnico from '../components/GerarIdÚnico'
import { AddBibliotecaValidator } from '../Validator/AddBibliotecaValidator'

export default function AddBiblioteca(props) {

    const navigation = useNavigation()
    const { acaoBiblioteca } = props.route.params

    const [biblioteca, setBiblioteca] = useState([])

    async function loadBiblioteca() {

        try {
            const response = await AsyncStorage.getItem('biblioteca')
            const alunosStorage = response ? JSON.parse(response) : []
            setBiblioteca(alunosStorage)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadBiblioteca()
    }, [])

    async function salvar(bibliotecas) {
        // console.log('chegou até aqui', bibliotecas)
        try {
            let listAlunos = biblioteca
            bibliotecas.id = GerarIdÚnico(); // Add um ID único ao biblioteca
            listAlunos.push(bibliotecas)
            await AsyncStorage.setItem('biblioteca', JSON.stringify(listAlunos));
            setBiblioteca(listAlunos)
            
            
            Toast.show({
                type: 'success',
                text1: 'Biblioteca salva com sucesso!'
            })

            acaoBiblioteca()
            navigation.goBack()

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            <Formik
                initialValues={{ nomes: '', autor: '', dataPublicacao: ''}}
                validationSchema={AddBibliotecaValidator}
                onSubmit={values => salvar(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
                    <>
                        <View style={{ gap: Global.espacoPadrao, padding: Global.espacoPadrao }}>
         
                            <TextInput
                                // style={AddBibliotecaStyle.input}
                                outlineColor={Global.secondaryColor}
                                activeOutlineColor={Global.mainColor}
                                textColor={Global.secondaryColor}
                                mode='outlined'
                                label='Nome'
                                onChangeText={handleChange('nomes')}
                                onBlur={handleBlur('nomes')}
                                value={values.nomes}
                                error={errors.nomes ? true : false}
                            />

                            {touched.nomes && errors.nomes && (
                                <Text style={{ color: Global.mainColor, textAlign: 'center' }}>{errors.nomes}</Text>
                            )}

                            <TextInput
                                // style={AddBibliotecaStyle.input}
                                outlineColor={Global.secondaryColor}
                                activeOutlineColor={Global.mainColor}
                                textColor={Global.secondaryColor}
                                mode='outlined'
                                label='Autor'
                                onChangeText={handleChange('autor')}
                                onBlur={handleBlur('autor')}
                                value={values.autor}
                                error={errors.autor ? true : false}
                            />

                            {touched.autor && errors.autor && (
                                <Text style={{ color: Global.mainColor, textAlign: 'center' }}>{errors.autor}</Text>
                            )}

                            <TextInput
                                // style={AddBibliotecaStyle.input}
                                outlineColor={Global.secondaryColor}
                                activeOutlineColor={Global.mainColor}
                                textColor={Global.secondaryColor}
                                mode='outlined'
                                label='Data publicacao'
                                onChangeText={handleChange('dataPublicacao')}
                                onBlur={handleBlur('dataPublicacao')}
                                keyboardType='numeric'
                                value={values.dataPublicacao}
                                error={errors.dataPublicacao ? true : false}
                                render={props =>
                                    <TextInputMask
                                        {...props}
                                        type={'datetime'}
                                    />
                                }
                            />

                            {touched.dataPublicacao && errors.dataPublicacao && (
                                <Text style={{ color: Global.mainColor, textAlign: 'center' }}>{errors.dataPublicacao}</Text>
                            )}

                        </View>
                        <View style={{ marginTop: 10, marginRight: 10, flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
                            <TouchableOpacity style={AddBibliotecaStyle.botao} onPress={() => navigation.goBack()}><Text style={AddBibliotecaStyle.TextBotao}>Voltar</Text></TouchableOpacity>
                            <TouchableOpacity style={AddBibliotecaStyle.botao} onPress={handleSubmit}><Text style={AddBibliotecaStyle.TextBotao}>Enviar</Text></TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    )
}
