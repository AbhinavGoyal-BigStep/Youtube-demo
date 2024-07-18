import { SwaggerDefinitionConstant } from 'swagger-express-ts';

export default {
  search: {
    path: '/search',
    description: 'search',
    summary: 'search',
    parameters: {
      body: {
        properties: {
          type: { type: SwaggerDefinitionConstant.STRING, required: true },
          q: {
            type: SwaggerDefinitionConstant.ARRAY,
            items: {
              type: SwaggerDefinitionConstant.STRING,
            },
            required: true,
          },
          maxResults: {
            type: SwaggerDefinitionConstant.STRING,
            required: true,
          },
          part: { type: SwaggerDefinitionConstant.STRING, required: true },
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
      },
    },
  },
};
