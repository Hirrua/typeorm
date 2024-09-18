import Joi from "joi"

const userShemaValidation = Joi.object({
    id: Joi.number().optional(),
    nome: Joi.string().required().min(3).max(100).messages({
        "string.base": "O campo nome deve ser uma string",
        "string.empty": "O campo nome não deve estar vazio",
        "string.min": "O campo deve ter pelo menos {#limit} caracteres",
        "string.max": "O campo não pode ter mais de {#limit} caracteres",
        "any.required": "O campo nome é obrigatório"
    }),
    email: Joi.string().email().required().min(10).max(50).messages({
        "string.email": "O campo email deve ser um email valido",
        "string.empty": "O campo email não deve estar vazio",
        "string.min": "O campo deve ter pelo menos {#limit} caracteres",
        "string.max": "O campo não pode ter mais de {#limit} caracteres" ,
        "any.required": "O campo email é obrigatório"
    }),
    nasimento: Joi.date().required().messages({
        "date.base": "O campo data de nascimento deve ter uma data",
        "any.required": "O campo nascimento é obrigatório"
    })

})

export default userShemaValidation