import { body, param } from 'express-validator';

const postCreate = [];

const idParamValidation = [
  param('id', 'Id must be a valid mongo id').isMongoId(),
];

const youtubeSearchValidation = [
  body('maxResults', 'max result should be in the range 0 to 50').isInt({
    min: 0,
    max: 50,
  }),
  body('part', 'part is not present or not set as snippet')
    .exists()
    .isString()
    .equals('snippet'),
  body('q', 'search string can not be empty').exists(),
];

export { postCreate, idParamValidation, youtubeSearchValidation };
