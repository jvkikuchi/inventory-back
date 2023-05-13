const serverlessConfiguration = {
  service: "${env:service, 'inventory-back'}",
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
    createSupplier: {
      handler: 'src/lambdas/createSupplier/index.bootstrap',
      name: 'create-supplier-${self:provider.stage}',
      events: [
        {
          http: {
            path: 'supplier',
            method: 'post',
          },
        },
      ],
    },
    listSuppliers: {
      handler: 'src/lambdas/ListSuppliers/index.bootstrap',
      name: 'list-suppliers-${self:provider.stage}',
      events: [
        {
          http: {
            path: 'supplier',
            method: 'get',
          },
        },
      ],
    },
    suppliersFinancialStatistics: {
      handler: 'src/lambdas/SuppliersFinancialStatistics/index.bootstrap',
      name: 'suppliers-financial-statistics-${self:provider.stage}',
      events: [
        {
          http: {
            path: 'supplier/{supplierId}/statistics/{userId}',
            method: 'get',
          },
        },
      ],
    },
  },
  plugins: ['serverless-plugin-typescript', 'serverless-offline'],
};

module.exports = serverlessConfiguration;
