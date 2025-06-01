import Joi from "joi";

export const createSimulationSchema = Joi.object({
  totalAmount: Joi.number().precision(2).positive().required().messages({
    "number.base": "O totalAmount deve ser um número",
    "number.positive": "O totalAmount deve ser um número positivo",
    "any.required": "O totalAmount é obrigatório",
  }),
  numberOfInstallments: Joi.number().integer().positive().required().messages({
    "number.base": "O numberOfInstallments deve ser um número",
    "number.integer": "O numberOfInstallments deve ser um número inteiro",
    "number.positive": "O numberOfInstallments deve ser um número positivo",
    "any.required": "O numberOfInstallments é obrigatório",
  }),
  monthlyInterestRate: Joi.number()
    .precision(4)
    .positive()
    .required()
    .messages({
      "number.base": "O monthlyInterestRate deve ser um número",
      "number.positive": "O monthlyInterestRate deve ser um número positivo",
      "any.required": "O monthlyInterestRate é obrigatório",
    }),
});

export const updateSimulationSchema = Joi.object({
  totalAmount: Joi.number().precision(2).positive().messages({
    "number.base": "O totalAmount deve ser um número",
    "number.positive": "O totalAmount deve ser um número positivo",
  }),
  numberOfInstallments: Joi.number().integer().positive().messages({
    "number.base": "O numberOfInstallments deve ser um número",
    "number.integer": "O numberOfInstallments deve ser um número inteiro",
    "number.positive": "O numberOfInstallments deve ser um número positivo",
  }),
  monthlyInterestRate: Joi.number().precision(4).positive().messages({
    "number.base": "O monthlyInterestRate deve ser um número",
    "number.positive": "O monthlyInterestRate deve ser um número positivo",
  }),
});
