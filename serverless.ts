const serverlessConfiguration = {
  service: "${env:service, 'inventory'}",
  org: 'inventory',
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    versionFunctions: false,
    region: "${opt:region, 'sa-east-1'}",
    stage: "${opt:stage, 'dev'}",
    memorySize: 256,
    logRetentionInDays: 30,
    logs: {
      websocket: true,
    },
  },
  package: {
    individually: true,
    exclude: ['.git/**', '.gitignore', '.github/**', '.vscode/**'],
  },
  functions: {
    listProducts: {
      handler: 'src/lambdas/ListProducts/index.bootstrap',
      name: 'list-products-${self:provider.stage}',
      events: [
        {
          http: {
            path: 'product',
            method: 'get',
          },
        },
      ],
    },
    createCategory: {
      handler: 'src/lambdas/CreateCategory/index.bootstrap',
      name: 'create-category-${self:provider.stage}',
      events: [
        {
          http: {
            path: 'category',
            method: 'post',
          },
        },
      ],
    },
    createNewProduct: {
      handler: 'src/lambdas/CreateNewProduct/index.bootstrap',
      name: 'create-new-product-${self:provider.stage}',
      events: [
        {
          http: {
            path: 'product',
            method: 'post',
          },
        },
      ],
    },
    getTeste: {
      handler: 'src/lambdas/getTest/index.bootstrap',
      name: 'get-teste-${self:provider.stage}',
      events: [
        {
          http: {
            path: 'teste',
            method: 'post',
          },
        },
      ],
    },
  },
  plugins: ['serverless-plugin-typescript', 'serverless-offline'],
};

module.exports = serverlessConfiguration;
