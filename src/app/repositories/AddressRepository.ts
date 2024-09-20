import { ValidationErrorItem } from "joi";
import Address from "../entities/Address";
import { AppDataSource } from "../../database/data-source";
import ErrorExtention from "../utils/ErrorExtention";
import addressSchemaValidation from "../utils/validations/addressSchemaValidation";
import { IAddressInput, IAddressOutput } from "../interfaces/IAddress";

class AddressRepository {
    private static addressRepository = AppDataSource.getRepository(Address)

    static async getAddress(): Promise<IAddressOutput[]> {
        return this.addressRepository.find({ relations: { users: true } })
    }

    static async newAddress(address: IAddressInput): Promise<IAddressOutput> {
        const { error } = addressSchemaValidation.validate(address, { abortEarly: false })
        if (error) {
            const validationError = error.details.map((detail: ValidationErrorItem) => detail.message)
            throw new ErrorExtention(400, validationError.join(","))
        }

        const createAddress = await this.addressRepository.save(address)
        return createAddress
    }

    static async deleteAddress(id: number): Promise<string> {
        await this.addressRepository.delete(id)
        return "Address was deleted"
    }
}

export default AddressRepository