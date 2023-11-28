import * as Yup from 'yup'

const AddBibliotecaValidator = Yup.object().shape({
    nomes: Yup.string().required('Campo obrigatório!'),
    autor: Yup.string().required('Campo obrigatório!'),
    dataPublicacao: Yup.string().required('Campo obrigatório!'),
})

export { AddBibliotecaValidator }