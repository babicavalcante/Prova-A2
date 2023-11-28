import * as Yup from 'yup'

const AlunoValidator = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório!'),
    sobreName: Yup.string().required('Campo obrigatório!'),
    email: Yup.string().email().required('Campo obrigatório!'),
    numero: Yup.string().required('Campo obrigatório!'),
    cpf: Yup.string().required('Campo obrigatório!'),
    date: Yup.string().required('Campo obrigatório!'),
})

export { AlunoValidator }