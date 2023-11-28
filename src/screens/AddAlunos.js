import { Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { TextInput } from 'react-native-paper'
import { AddProfessoresStyle } from '../styles/AddProfessores'
import { useNavigation } from '@react-navigation/native'
import { Global } from '../styles/Global'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import GerarIdÚnico from '../components/GerarIdÚnico'
import { AlunoValidator } from '../Validator/AlunoValidator'
import { TextInputMask } from 'react-native-masked-text'

export default function AddAlunos(props) {
    const navigation = useNavigation()
    const { acaoAlunos } = props.route.params

    const [alunos, setAlunos] = useState([])
    const [cursos, setCursos] = useState([])

    async function loadAlunos() {
        const response = await AsyncStorage.getItem('aluno')
        const alunosStorage = response ? JSON.parse(response) : []
        setAlunos(alunosStorage)
    }

    async function loadCursos() {

        try {
            const response = await AsyncStorage.getItem('curso')
            const alunosStorage = response ? JSON.parse(response) : []
            setCursos(alunosStorage)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadAlunos()
        loadCursos()
    }, [])

    async function salvar(aluno) {
        // console.log('chegou até aqui', aluno)
        try {
            let listAlunos = alunos
            aluno.id = GerarIdÚnico(); // Add um ID único ao alunos
            listAlunos.push(aluno)
            await AsyncStorage.setItem('aluno', JSON.stringify(listAlunos));
            setAlunos(listAlunos)

            Toast.show({
                type: 'success',
                text1: 'Pessoa salva com sucesso!'
            })

            acaoAlunos()
            navigation.goBack()

        } catch (error) {
            console.log(error)
        }
    }

    console.log(cursos)
    return (
        <View>
            <Formik
                initialValues={{ name: '', sobreName: '', email: '', numero: '', cpf: '', cursos: '', date: '',}}
                validationSchema={AlunoValidator}
                onSubmit={values => salvar(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
                    <>
                        <View style={{ gap: Global.espacoPadrao, padding: Global.espacoPadrao }}>
                            {/* <Form>
                        <Field as="select" name="color">
                            {cursos.map(item => {
                                <option  key={item.id} value="red"><Text>{item.curso}</Text></option>
                            })}
                            </Field>
                            </Form> */}
                            <TextInput
                                // style={AddProfessoresStyle.input}
                                outlineColor={Global.secondaryColor}
                                activeOutlineColor={Global.mainColor}
                                textColor={Global.secondaryColor}
                                mode='outlined'
                                label='name'
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
                                label='Telefone'
                                placeholder='(99) 99999-9999'
                                onChangeText={handleChange('numero')}
                                onBlur={handleBlur('numero')}
                                keyboardType='numeric'
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
                                placeholder='999.999.999-99'
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
                                label='Data'
                                placeholder='99/99/9999'
                                onChangeText={handleChange('date')}
                                onBlur={handleBlur('date')}
                                keyboardType='numeric'
                                value={values.date}
                                render={props =>
                                    <TextInputMask
                                        {...props}
                                        type={'datetime'}
                                        options={{
                                            format: 'DD/MM/YYYY'
                                        }}
                                    />
                                }
                            />

                            {touched.date && errors.date && (
                                <Text style={{ color: Global.mainColor, textAlign: 'center' }}>{errors.date}</Text>
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

