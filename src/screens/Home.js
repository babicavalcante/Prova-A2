import { Alert, FlatList, Pressable, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { DataTable, FAB, List, Portal, Text } from 'react-native-paper'
import { HomeStyle } from '../styles/HomeStyle';
import { Global } from '../styles/Global';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { ToUpperCase } from '../components/CapitalizeLetter';

export default function Home() {
    const navigation = useNavigation()

    const [professores, setProfessores] = useState([])
    const [alunos, setAlunos] = useState([])
    const [cursos, setCursos] = useState([])
    const [biblioteca, setBiblioteca] = useState([])
    const [departamento, setDepartamento] = useState([])

    const [state, setState] = useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    async function loadDados() {
        try {
            const values = await AsyncStorage.multiGet(['professor', 'aluno', 'curso', 'biblioteca', 'departamento']);
            const professores = JSON.parse(values[0][1]);
            const alunos = JSON.parse(values[1][1]);
            const cursos = JSON.parse(values[2][1]);
            const biblioteca = JSON.parse(values[3][1]);
            const departamento = JSON.parse(values[4][1]);

            setProfessores(professores);
            setAlunos(alunos);
            setCursos(cursos);
            setBiblioteca(biblioteca);
            setDepartamento(departamento);
        } catch (error) {
            // erro ao ler os valores
            console.error(error);
        }
    }

    useLayoutEffect(() => {
        loadDados();
    }, [])

    async function ExcliuirProfessores(professorExcluir) {
        const novaListaProfessores = professores.filter(professor => professor.id !== professorExcluir.id);
        await AsyncStorage.setItem('professor', JSON.stringify(novaListaProfessores));
        setProfessores(novaListaProfessores);

        Toast.show({
            type: 'success',
            text1: 'Professor excluído com sucesso!'
        });
    }

    function handleExcliuirProfessores(professoresExcluir) {
        Alert.alert("Confirmação?", "Você realmente deseja excluir este cliente?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => ExcliuirProfessores(professoresExcluir) }
            ]
        );
    }

    async function ExcliuirAlunos(alunoExcluir) {
        const novaListaAlunos = alunos.filter(aluno => aluno.id !== alunoExcluir.id);
        await AsyncStorage.setItem('aluno', JSON.stringify(novaListaAlunos));
        setAlunos(novaListaAlunos);

        Toast.show({
            type: 'success',
            text1: 'Alunos excluído com sucesso!'
        });
    }

    function handleExcliuirAlunos(alunoExcluir) {
        Alert.alert("Confirmação?", "Você realmente deseja excluir este cliente?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => ExcliuirAlunos(alunoExcluir) }
            ]
        );
    }

    async function ExcluirCursos(cursoExcluir) {
        const novaListaCursos = cursos.filter(curso => curso.id !== cursoExcluir.id);
        await AsyncStorage.setItem('curso', JSON.stringify(novaListaCursos));
        setCursos(novaListaCursos);

        Toast.show({
            type: 'success',
            text1: 'Professor excluído com sucesso!'
        });
    }

    function handleExcliuirCursos(cursosExcluir) {
        Alert.alert("Confirmação?", "Você realmente deseja excluir este cliente?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => ExcluirCursos(cursosExcluir) }
            ]
        );
    }

    async function ExcluirLivro(livroId) {
        try {
            const novaListaBiblioteca = biblioteca.filter(item => item.id !== livroId.id);
            await AsyncStorage.setItem('biblioteca', JSON.stringify(novaListaBiblioteca));
            setBiblioteca(novaListaBiblioteca);

            Toast.show({
                type: 'success',
                text1: 'Livro excluído com sucesso!'
            });
        } catch (error) {
            console.log(error)
        }

    }

    function handleExcliuirLivro(livroId) {
        Alert.alert("Confirmação?", "Você realmente deseja excluir este Livro?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => ExcluirLivro(livroId) }
            ]
        );
    }

    async function ExcluirDepartamento(departamentoId) {
        try {
            const novaListaDepartamento = departamento.filter(item => item.id !== departamentoId.id);
            await AsyncStorage.setItem('departamento', JSON.stringify(novaListaDepartamento));
            setDepartamento(novaListaDepartamento);

            Toast.show({
                type: 'success',
                text1: 'Departamento excluído com sucesso!'
            });
        } catch (error) {
            console.log(error)
        }

    }

    function handleExcliuirDepartamento(departamentoId) {
        Alert.alert("Confirmação?", "Você realmente deseja excluir este departamento?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => ExcluirDepartamento(departamentoId) }
            ]
        );
    }

    async function limparAsyncStorage() {
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage limpo com sucesso!');
        } catch (error) {
            console.log('Erro ao limpar o AsyncStorage: ', error);
        }
    }

    const editarLivro = (item) => {
        navigation.navigate('Biblioteca', { livro: item }); // Navegue para a página Formik e passe os dados do livro como parâmetro
    };

    console.log(departamento)

    return (
        <View>
            <List.AccordionGroup>
                <List.Accordion style={HomeStyle.Accordion} titleStyle={HomeStyle.AccordionTitle} title="Professores" id="1">
                    {/* <List.Item description='Lista de todos os professores'/> */}
                    <View style={HomeStyle.AccordionInterno}>
                        <Text>Lista com todos os professores</Text>

                        <DataTable style={{ width: '100%', marginVertical: 10 }}>
                            <DataTable.Header style={HomeStyle.tableHeader}>
                                <DataTable.Title style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableInside}>Nome</DataTable.Title>
                                <DataTable.Title style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableInside}>Email</DataTable.Title>
                                <DataTable.Title style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableInside}>Numero</DataTable.Title>
                                <DataTable.Title style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableInside}>Salario</DataTable.Title>
                                <DataTable.Title style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableInside}>Editar / Excluir</DataTable.Title>
                            </DataTable.Header>
                            <FlatList
                                data={professores}
                                renderItem={({ item }) => (
                                    <>
                                        <DataTable.Row key={item.id} style={HomeStyle.tableRow}>
                                            <DataTable.Cell style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableRowInside}>{item.name}</DataTable.Cell>
                                            <DataTable.Cell style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableRowInside}>{item.email}</DataTable.Cell>
                                            <DataTable.Cell style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableRowInside}>{item.numero}</DataTable.Cell>
                                            <DataTable.Cell style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableRowInside}>{item.salario}</DataTable.Cell>
                                            <DataTable.Cell style={HomeStyle.TableRowInsideOther}>
                                                <Pressable onPress={() => handleExcliuirProfessores(item)}>
                                                    <Ionicons name='trash-outline' size={24} color={Global.mainColor} />
                                                </Pressable>
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                    </>
                                )}
                            />
                        </DataTable>
                    </View>
                </List.Accordion>

                <List.Accordion style={HomeStyle.Accordion} titleStyle={HomeStyle.AccordionTitle} title="Alunos" id="2">
                    {/* <List.Item title="Item 2" /> */}

                    <View style={HomeStyle.AccordionInterno}>
                        <Text>Lista com todos os Alunos</Text>

                        <DataTable style={{ width: '100%', marginVertical: 10 }}>
                            <DataTable.Header style={HomeStyle.tableHeader}>
                                <DataTable.Title style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableInside}>Nome</DataTable.Title>
                                <DataTable.Title style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableInside}>email</DataTable.Title>
                                <DataTable.Title style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableInside}>numero</DataTable.Title>
                                <DataTable.Title style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableInside}>Matricula</DataTable.Title>
                                <DataTable.Title style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableInside}>Excluir</DataTable.Title>
                            </DataTable.Header>
                            <FlatList
                                data={alunos}
                                renderItem={({ item }) => (
                                    <>
                                        <DataTable.Row key={item.id} style={HomeStyle.tableRow}>
                                            <DataTable.Cell style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableRowInside}>{item.name}</DataTable.Cell>
                                            <DataTable.Cell style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableRowInside}>{item.email}</DataTable.Cell>
                                            <DataTable.Cell style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableRowInside}>{item.numero}</DataTable.Cell>
                                            <DataTable.Cell style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableRowInside}>{item.date}</DataTable.Cell>
                                            <DataTable.Cell style={HomeStyle.TableRowInsideOther}>
                                                <Pressable onPress={() => handleExcliuirAlunos(item)}>
                                                    <Ionicons name='trash-outline' size={24} color={Global.mainColor} />
                                                </Pressable>
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                    </>
                                )}
                            />
                        </DataTable>
                    </View>
                </List.Accordion>

                <List.Accordion style={HomeStyle.Accordion} titleStyle={HomeStyle.AccordionTitle} title="Cursos" id="3">
                    {/* <List.Item title="Item 2" /> */}

                    <View style={HomeStyle.AccordionInterno}>
                        <Text>Lista com todos os cursos</Text>

                        <DataTable style={{ width: '100%', marginVertical: 10 }}>
                            <DataTable.Header style={HomeStyle.tableHeader}>
                                <DataTable.Title style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableInside}>Curso</DataTable.Title>
                                <DataTable.Title style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableInside}>Qnt Alunos</DataTable.Title>
                                <DataTable.Title style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableInside}>Excluir</DataTable.Title>
                            </DataTable.Header>
                            <FlatList
                                data={cursos}
                                renderItem={({ item }) => (
                                    <>
                                        <DataTable.Row key={item.id} style={HomeStyle.tableRow}>
                                            <DataTable.Cell style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableRowInside}>{ToUpperCase(item.sigla)}</DataTable.Cell>
                                            <DataTable.Cell style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableRowInside}>Qnt Alunos</DataTable.Cell>
                                            <DataTable.Cell style={HomeStyle.TableRowInsideOther}>
                                                <Pressable onPress={() => handleExcliuirCursos(item)}>
                                                    <Ionicons name='trash-outline' size={24} color={Global.mainColor} />
                                                </Pressable>
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                    </>
                                )}
                            />
                        </DataTable>
                    </View>
                </List.Accordion>

                <List.Accordion style={HomeStyle.Accordion} titleStyle={HomeStyle.AccordionTitle} title="Biblioteca" id="4">
                    <View style={HomeStyle.AccordionInterno}>
                        <Text>Lista com todos os biblioteca</Text>
                        <DataTable style={{ width: '100%', marginVertical: 10 }}>
                            <DataTable.Header style={HomeStyle.tableHeader}>
                                <DataTable.Title style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableInside}>Autor</DataTable.Title>
                                <DataTable.Title style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableInside}>Nome Livro</DataTable.Title>
                                <DataTable.Title style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableInside}>Publicação</DataTable.Title>
                                <DataTable.Title style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableInside}>Excluir / Edit</DataTable.Title>
                            </DataTable.Header>
                            <FlatList
                                data={biblioteca}
                                renderItem={({ item }) => (
                                    <DataTable.Row key={item.id} style={HomeStyle.tableRow}>
                                        <DataTable.Cell style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableRowInside}>{item.autor}</DataTable.Cell>
                                        <DataTable.Cell style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableRowInside}>{item.nomes}</DataTable.Cell>
                                        <DataTable.Cell style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableRowInside}>{item.dataPublicacao}</DataTable.Cell>
                                        <DataTable.Cell style={HomeStyle.TableRowInsideOther}>
                                            <Pressable onPress={() => handleExcliuirLivro(item)}>
                                                <Ionicons name='trash-outline' size={24} color={Global.mainColor} />
                                            </Pressable>
                                            <Pressable onPress={() => editarLivro(item)}>
                                                <Ionicons name='sync-circle-outline' size={24} color={Global.mainColor} />
                                            </Pressable>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )}
                            />
                        </DataTable>
                    </View>
                </List.Accordion>

                <List.Accordion style={HomeStyle.Accordion} titleStyle={HomeStyle.AccordionTitle} title="Departamento" id="5">
                    <View style={HomeStyle.AccordionInterno}>
                        <Text>Lista todos os departamentos</Text>
                        <DataTable style={{ width: '100%', marginVertical: 10 }}>
                            <DataTable.Header style={HomeStyle.tableHeader}>
                                <DataTable.Title style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableInside}>Nome</DataTable.Title>
                                <DataTable.Title style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableInside}>Orçamento</DataTable.Title>
                                <DataTable.Title style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableInside}>Excluir / Edit</DataTable.Title>
                            </DataTable.Header>
                            <FlatList
                                data={departamento}
                                renderItem={({ item }) => (
                                    <DataTable.Row key={item.id} style={HomeStyle.tableRow}>
                                        <DataTable.Cell style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableRowInside}>{item.nome}</DataTable.Cell>
                                        <DataTable.Cell style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableRowInside}>{item.orcamento}</DataTable.Cell>
                                        <DataTable.Cell style={HomeStyle.TableRowInsideOther}>
                                            <Pressable onPress={() => handleExcliuirDepartamento(item)}>
                                                <Ionicons name='trash-outline' size={24} color={Global.mainColor} />
                                            </Pressable>
                                            <Pressable onPress={() => editarLivro(item)}>
                                                <Ionicons name='sync-circle-outline' size={24} color={Global.mainColor} />
                                            </Pressable>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )}
                            />
                        </DataTable>
                    </View>
                </List.Accordion>

            </List.AccordionGroup>

            <Portal>
                <FAB.Group
                    open={open}
                    fabStyle={{ backgroundColor: Global.secondaryColor, }}
                    color={Global.mainColor}

                    visible
                    icon={open ? 'close-circle-outline' : 'plus-circle-outline'}

                    actions={[
                        {
                            containerStyle: { backgroundColor: Global.secondaryColor },
                            color: Global.mainColor,
                            labelTextColor: Global.mainColor, style: { backgroundColor: Global.secondaryColor },

                            icon: 'account-tie',
                            label: 'Professor',
                            onPress: () => { navigation.navigate('addProfessores', { acao: loadDados }) },
                        },
                        {
                            containerStyle: { backgroundColor: Global.secondaryColor },
                            color: Global.mainColor,
                            labelTextColor: Global.mainColor, style: { backgroundColor: Global.secondaryColor },

                            icon: 'account-plus',
                            label: 'Aluno',
                            onPress: () => { navigation.navigate('addAlunos', { acaoAlunos: loadDados }) },
                        },
                        {
                            containerStyle: { backgroundColor: Global.secondaryColor },
                            color: Global.mainColor,
                            labelTextColor: Global.mainColor, style: { backgroundColor: Global.secondaryColor },

                            icon: 'account-plus',
                            label: 'Curso',
                            onPress: () => { navigation.navigate('Cursos', { acaoCursos: loadDados }) },
                        },
                        {
                            containerStyle: { backgroundColor: Global.secondaryColor },
                            color: Global.mainColor,
                            labelTextColor: Global.mainColor, style: { backgroundColor: Global.secondaryColor },

                            icon: 'account-plus',
                            label: 'Biblioteca',
                            onPress: () => { navigation.navigate('Biblioteca', { acaoBiblioteca: loadDados }) },
                        },
                        {
                            containerStyle: { backgroundColor: Global.secondaryColor },
                            color: Global.mainColor,
                            labelTextColor: Global.mainColor, style: { backgroundColor: Global.secondaryColor },

                            icon: 'account-plus',
                            label: 'Departamento',
                            onPress: () => { navigation.navigate('Departamento', { acaoDepartamento: loadDados }) },
                        },
                    ]}
                    onStateChange={onStateChange}
                />
            </Portal>
        </View>
    )
}
