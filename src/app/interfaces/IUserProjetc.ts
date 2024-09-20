interface IUserProjectInput {
    horas_trabalhada: number
    user_id: number
    project_id: number
}

interface IUserProjectOutput {
    id: number
    horas_trabalhada: number
    user_id: number
    project_id: number
}

export { IUserProjectInput, IUserProjectOutput }