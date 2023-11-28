import * as Yup from 'yup'

const ValidationSchema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório!'),
    sobreName: Yup.string().required('Campo obrigatório!'),
    email: Yup.string().email().required('Campo obrigatório!'),
    numero: Yup.string().required('Campo obrigatório!'),
    cpf: Yup.string().required('Campo obrigatório!'),
    salario: Yup.string().required('Campo obrigatório!'),
})

export { ValidationSchema }