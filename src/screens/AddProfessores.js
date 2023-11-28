import { Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Formik } from 'formik'
import { TextInput } from 'react-native-paper'
import { AddProfessoresStyle } from '../styles/AddProfessores'
import { useNavigation } from '@react-navigation/native'
import { Global } from '../styles/Global'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import GerarIdÚnico from '../components/GerarIdÚnico'
import { ValidationSchema } from '../Validator/Validator'
import { TextInputMask } from 'react-native-masked-text'
import { Picker } from '@react-native-picker/picker'

export default function AddProfessores(props) {
    const navigation = useNavigation()
    const { acao } = props.route.params

    const pickerRef = useRef();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }


    const [professores, setProfessores] = useState([])

    async function loadProfessores() {
        const response = await AsyncStorage.getItem('professor')
        const professoresStorage = response ? JSON.parse(response) : []
        setProfessores(professoresStorage)
    }

    useEffect(() => {
        loadProfessores()
    })

    async function salvar(professor) {

        try {
            let listProfessores = professores
            professor.id = GerarIdÚnico(); // Add um ID único ao professores
            listProfessores.push(professor)
            await AsyncStorage.setItem('professor', JSON.stringify(listProfessores));
            setProfessores(listProfessores)

            Toast.show({
                type: 'success',
                text1: 'Professor registrado com sucesso!'
            })

            acao()
            navigation.goBack()

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View>
            <Formik
                initialValues={{ name: '', sobreName: '', email: '', numero: '', cpf: '', salario: '', curso: '', }}
                validationSchema={ValidationSchema}
                onSubmit={values => salvar(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
                    <>
                        <View style={{ gap: Global.espacoPadrao, padding: Global.espacoPadrao }}>
                            <TextInput
                                // style={AddProfessoresStyle.input}
                                outlineColor={Global.secondaryColor}
                                activeOutlineColor={Global.mainColor}
                                textColor={Global.secondaryColor}
                                mode='outlined'
                                label='Nome'
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                error={errors.name ? true : false}
                            />

                            {touched.name && errors.name && (
                                <Text style={{ color: Global.mainColor, textAlign: 'center' }}>{errors.name}</Text>
                            )}

                            <TextInput
                                // style={AddProfessoresStyle.input}
                                outlineColor={Global.secondaryColor}
                                activeOutlineColor={Global.mainColor}
                                textColor={Global.secondaryColor}
                                mode='outlined'
                                label='sobre Nome'
                                onChangeText={handleChange('sobreName')}
                                onBlur={handleBlur('sobreName')}
                                value={values.sobreName}
                                error={errors.sobreName ? true : false}
                            />

                            {touched.sobreName && errors.sobreName && (
                                <Text style={{ color: Global.mainColor, textAlign: 'center' }}>{errors.sobreName}</Text>
                            )}

                            {/* <Picker
                                ref={pickerRef}
                                selectedValue={handleChange('curso')}
                                onValueChange={(itemValue, itemIndex) =>
                                    handleChange(itemValue)
                                }>
                                <Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                            </Picker> */}

                            <TextInput
                                // style={AddProfessoresStyle.input}
                                outlineColor={Global.secondaryColor}
                                activeOutlineColor={Global.mainColor}
                                textColor={Global.secondaryColor}
                                mode='outlined'
                                label='email'
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                keyboardType='email-address'
                                value={values.email}
                            />

                            {touched.email && errors.email && (
                                <Text style={{ color: Global.mainColor, textAlign: 'center' }}>{errors.email}</Text>
                            )}

                            <TextInput
                                // style={AddProfessoresStyle.input}
                                outlineColor={Global.secondaryColor}
                                activeOutlineColor={Global.mainColor}
                                textColor={Global.secondaryColor}
                                mode='outlined'
                                label='numero'
                                onChangeText={handleChange('numero')}
                                onBlur={handleBlur('numero')}
                                keyboardType='name-phone-pad'
                                value={values.numero}
                                render={props =>
                                    <TextInputMask
                                        {...props}
                                        type={'cel-phone'}
                                    />
                                }
                            />

                            {touched.numero && errors.numero && (
                                <Text style={{ color: Global.mainColor, textAlign: 'center' }}>{errors.numero}</Text>
                            )}

                            <TextInput
                                // style={AddProfessoresStyle.input}
                                outlineColor={Global.secondaryColor}
                                activeOutlineColor={Global.mainColor}
                                textColor={Global.secondaryColor}
                                mode='outlined'
                                label='CPF'
                                onChangeText={handleChange('cpf')}
                                onBlur={handleBlur('cpf')}
                                keyboardType='numeric'
                                value={values.cpf}
                                render={props =>
                                    <TextInputMask
                                        {...props}
                                        type={'cpf'}
                                    />
                                }
                            />

                            {touched.cpf && errors.cpf && (
                                <Text style={{ color: Global.mainColor, textAlign: 'center' }}>{errors.cpf}</Text>
                            )}

                            <TextInput
                                // style={AddProfessoresStyle.input}
                                outlineColor={Global.secondaryColor}
                                activeOutlineColor={Global.mainColor}
                                textColor={Global.secondaryColor}
                                mode='outlined'
                                label='salario'
                                onChangeText={handleChange('salario')}
                                onBlur={handleBlur('salario')}
                                keyboardType='numeric'
                                value={values.salario}
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

                            {touched.salario && errors.salario && (
                                <Text style={{ color: Global.mainColor, textAlign: 'center' }}>{errors.salario}</Text>
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

