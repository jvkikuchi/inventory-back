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
    timeout: 10,
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
<<<<<<< HEAD
    getTeste: {
      handler: 'src/lambdas/getTest/index.bootstrap',
      name: 'get-teste-${self:provider.stage}',
      events: [
        {
          http: {
            path: 'teste',
=======
    listProducts: {
      handler: 'src/lambdas/ListProducts/index.bootstrap',
      name: 'list-products-${self:provider.stage}',
      events: [
        {
          http: {
            path: 'product/list',
            method: 'get',
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
>>>>>>> 071114ce356f3d7146a86ad2e4c0501ee1371870
            method: 'post',
          },
        },
      ],
    },
<<<<<<< HEAD
    createSupplier: {
      handler: 'src/lambdas/createSupplier/index.bootstrap',
      name: 'create-supplier-${self:provider.stage}',
      events: [
        {
          http: {
            path: 'supplier',
=======
    getTeste: {
      handler: 'src/lambdas/getTest/index.bootstrap',
      name: 'get-teste-${self:provider.stage}',
      events: [
        {
          http: {
            path: 'teste',
>>>>>>> 071114ce356f3d7146a86ad2e4c0501ee1371870
            method: 'post',
          },
        },
      ],
    },
  },
  plugins: ['serverless-plugin-typescript', 'serverless-offline'],
};

module.exports = serverlessConfiguration;
