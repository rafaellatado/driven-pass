import Joi from 'joi';

export const signUpSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ 'any.required': 'Name is required' }),
  email: Joi.string()
    .email()
    .required()
    .messages({ 
      'any.required': 'Email is required',
      'string.email': 'Email must be valid',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({ 
      'any.required': 'Password is required',
      'string.min': 'Password must be at least 6 characters',
    }),
  confirmPassword: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 
      'any.only': 'Confirm password must match password',
      'any.required': 'Confirm password is required',
    }),
});

export const signInSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({ 
    'any.required': 'Email is required',
    'string.email': 'Email must be valid',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({ 
      'any.required': 'Password is required',
      'string.min': 'Password must be at least 6 characters',
    }),
});
