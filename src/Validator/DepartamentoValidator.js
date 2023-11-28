import * as Yup from 'yup'

const DepartamentoValidator = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório!'),
    orcamento: Yup.string().required('Campo obrigatório!'),
})

export { DepartamentoValidator }