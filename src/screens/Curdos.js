import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Field, Form, Formik } from 'formik'
import { Text, TextInput } from 'react-native-paper'
import { AddProfessoresStyle } from '../styles/AddProfessores'
import { Global } from '../styles/Global'
import GerarIdÚnico from '../components/GerarIdÚnico'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'

export default function Curdos(props) {

    const navigation = useNavigation()
    const { acaoCursos } = props.route.params

    const [cursos, setCursos] = useState([])

    async function loadCursos() {
        const response = await AsyncStorage.getItem('curso')
        const cursosStorage = response ? JSON.parse(response) : []
        setCursos(cursosStorage)
    }

    useEffect(() => {
        loadCursos()
    }, [])

    async function salvar(curso) {
        // console.log('chegou até aqui', curso)
        try {
            let listCursos = cursos
            curso.id = GerarIdÚnico(); // Add um ID único ao cursos
            listCursos.push(curso)
            await AsyncStorage.setItem('curso', JSON.stringify(listCursos));
            setCursos(listCursos)

            Toast.show({
                type: 'success',
                text1: 'Pessoa salva com sucesso!'
            })

            acaoCursos()
            navigation.goBack()

        } catch (error) {
            console.log(error)
        }
    }

    console.log(cursos)
    return (
        <View>
            <Formik
                initialValues={{ curso: '', sigla: '', }}
                onSubmit={values => salvar(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
                    <>
                        <View style={{ gap: 10, padding: 10 }}>

                            <TextInput
                                // style={AddProfessoresStyle.input}
                                outlineColor={Global.secondaryColor}
                                activeOutlineColor={Global.mainColor}
                                textColor={Global.secondaryColor}
                                mode='outlined'
                                label='Curso'
                                onChangeText={handleChange('curso')}
                                onBlur={handleBlur('curso')}
                                value={values.curso}
                                error={errors.curso ? true : false}
                            />

                            {touched.curso && errors.curso && (
                                <Text style={{ color: Global.mainColor, textAlign: 'center' }}>{errors.curso}</Text>
                            )}

                            <TextInput
                                // style={AddProfessoresStyle.input}
                                outlineColor={Global.secondaryColor}
                                activeOutlineColor={Global.mainColor}
                                textColor={Global.secondaryColor}
                                mode='outlined'
                                label='Sigla'
                                onChangeText={handleChange('sigla')}
                                onBlur={handleBlur('sigla')}
                                value={values.sigla}
                                error={errors.sigla ? true : false}
                            />

                            {touched.sigla && errors.sigla && (
                                <Text style={{ color: Global.mainColor, textAlign: 'center' }}>{errors.sigla}</Text>
                            )}

                        </View>
                        <View style={{ marginTop: 10, marginRight: 10, flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
                            <TouchableOpacity style={AddProfessoresStyle.botao} onPress={() => navigation.goBack()}><Text style={AddProfessoresStyle.TextBotao}>Voltar</Text></TouchableOpacity>
                            <TouchableOpacity style={AddProfessoresStyle.botao} onPress={handleSubmit}><Text style={AddProfessoresStyle.TextBotao}>Enviar</Text></TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({})