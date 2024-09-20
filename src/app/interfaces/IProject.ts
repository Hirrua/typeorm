interface IProjectInput {
    nome: string
    descricao: string
    inicio_em: Date
    termino_em: Date
    active?: boolean
}

interface IProjectOutput {
    id: number
    nome: string
    descricao: string
    inicio_em: Date
    termino_em: Date
    active?: boolean
}

export { IProjectInput, IProjectOutput }