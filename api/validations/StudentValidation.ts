import Joi from "joi";

export const createStudentSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required().messages({
    "string.base": "O nome deve ser um texto",
    "string.empty": "O nome é obrigatório",
    "string.min": "O nome deve ter pelo menos {#limit} caracteres",
    "string.max": "O nome deve ter no máximo {#limit} caracteres",
    "any.required": "O nome é obrigatório",
  }),
  lastName: Joi.string().min(2).max(30).required().messages({
    "string.base": "O sobrenome deve ser um texto",
    "string.empty": "O sobrenome é obrigatório",
    "string.min": "O sobrenome deve ter pelo menos {#limit} caracteres",
    "string.max": "O sobrenome deve ter no máximo {#limit} caracteres",
    "any.required": "O sobrenome é obrigatório",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "O email deve ser um texto",
    "string.email": "O email deve ser um endereço válido",
    "string.empty": "O email é obrigatório",
    "any.required": "O email é obrigatório",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "A senha deve ser um texto",
    "string.empty": "A senha é obrigatória",
    "string.min": "A senha deve ter pelo menos {#limit} caracteres",
    "any.required": "A senha é obrigatória",
  }),
});

export const updateStudentSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).messages({
    "string.base": "O nome deve ser um texto",
    "string.min": "O nome deve ter pelo menos {#limit} caracteres",
    "string.max": "O nome deve ter no máximo {#limit} caracteres",
  }),
  lastName: Joi.string().min(2).max(30).messages({
    "string.base": "O sobrenome deve ser um texto",
    "string.min": "O sobrenome deve ter pelo menos {#limit} caracteres",
    "string.max": "O sobrenome deve ter no máximo {#limit} caracteres",
  }),
  email: Joi.string().email().messages({
    "string.base": "O email deve ser um texto",
    "string.email": "O email deve ser um endereço válido",
  }),
  password: Joi.string().min(6).messages({
    "string.base": "A senha deve ser um texto",
    "string.min": "A senha deve ter pelo menos {#limit} caracteres",
  }),
});

export const loginStudentSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "O email deve ser um texto",
    "string.email": "O email deve ser um endereço válido",
    "string.empty": "O email é obrigatório",
    "any.required": "O email é obrigatório",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "A senha deve ser um texto",
    "string.empty": "A senha é obrigatória",
    "string.min": "A senha deve ter pelo menos {#limit} caracteres",
    "any.required": "A senha é obrigatória",
  }),
});
