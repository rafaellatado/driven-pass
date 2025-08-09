import Joi from 'joi';

export const credentialSchema = Joi.object({
  title: Joi.string().required().messages({ 'any.required': 'Title is required' }),
  url: Joi.string().uri().required().messages({
    'any.required': 'URL is required',
    'string.uri': 'URL must be a valid URI'
  }),
  username: Joi.string().required().messages({ 'any.required': 'Username is required' }),
  password: Joi.string().required().messages({ 'any.required': 'Password is required' }),
}); 
