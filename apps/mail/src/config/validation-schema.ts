import * as Joi from 'joi';

export const validationScehema = Joi.object({
  SMTP_HOST: Joi.string().required(),

  SMTP_PORT: Joi.string().required(),

  EMAIL_TEMLATES_DIRECTORY: Joi.string().required(),
});
