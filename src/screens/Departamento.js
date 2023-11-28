import { Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import { DepartamentoValidator } from '../Validator/DepartamentoValidator'
import { Global } from '../styles/Global'
import AddBibliotecaStyle from '../styles/AddBibliotecaStyle'
import { TextInputMask } from 'react-native-masked-text'
import GerarIdÚnico from '../components/GerarIdÚnico'

export default function Departamento(props) {

    const navigation = useNavigation()
    const { acaoDepartamento } = props.route.params

    const [departamento, setDepartamento] = useState([])

    async function loadBiblioteca() {

        try {
            const response = await AsyncStorage.getItem('departamento')
            const departamentoStorage = response ? JSON.parse(response) : []
            setDepartamento(departamentoStorage)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadBiblioteca()
    }, [])

    async function salvar(departamentos) {
        // console.log('chegou até aqui', departamentos)
        try {
            let listDepartamento = departamento
            departamentos.id = GerarIdÚnico(); // Add um ID único ao departamento
            listDepartamento.push(departamentos)
            await AsyncStorage.setItem('departamento', JSON.stringify(listDepartamento));
            setDepartamento(listDepartamento)


            Toast.show({
                type: 'success',
                text1: 'Departamento salvo com sucesso!'
            })

            acaoDepartamento()
            navigation.goBack()

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <View>
            <Formik
                initialValues={{ nome: '', orcamento: '' }}
                validationSchema={DepartamentoValidator}
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
                                label='nome'
                                onChangeText={handleChange('nome')}
                                onBlur={handleBlur('nome')}
                                value={values.nome}
                                error={errors.nome ? true : false}
                            />

                            {touched.nome && errors.nome && (
                                <Text style={{ color: Global.mainColor, textAlign: 'center' }}>{errors.nome}</Text>
                            )}

                            <TextInput
                                // style={AddBibliotecaStyle.input}
                                outlineColor={Global.secondaryColor}
                                activeOutlineColor={Global.mainColor}
                                textColor={Global.secondaryColor}
                                mode='outlined'
                                label='Orçamento'
                                onChangeText={handleChange('orcamento')}
                                onBlur={handleBlur('orcamento')}
                                value={values.orcamento}
                                error={errors.orcamento ? true : false}
                                render={props =>
                                    <TextInputMask
                                        {...props}
                                        type={'money'}
                                        options={{
                                            precision: 2,
                                            separator: ',',
                                            delimiter: '.',
                                            unit: 'R$ ',
                                            suffixUnit: ''
                                        }}
                                    />
                                }
                            />

                            {touched.orcamento && errors.orcamento && (
                                <Text style={{ color: Global.mainColor, textAlign: 'center' }}>{errors.orcamento}</Text>
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
