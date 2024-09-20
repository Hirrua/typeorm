interface IAddressInput {
    street: string
    city: string
    state: string
    user_id: number
}

interface IAddressOutput {
    id: number
    street: string
    city: string
    state: string
    user_id: number
}

export { IAddressInput, IAddressOutput }