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
                                <DataTable.Title style={HomeStyle.TableRowInsideOther} textStyle={HomeStyle.TableInside}>Excluir</DataTable.Title>
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
                                                    <Ionicons name='ellipsis-vertical-circle-outline' size={24} color={Global.mainColor} />
                                                </Pressable>
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                    </>
                                )}
                            />
                        </DataTable>
                    </View>
                </List.Accordion>