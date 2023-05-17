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
    architecture: 'arm64',
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
    updateProduct: {
      handler: 'src/lambdas/UpdateProduct/index.bootstrap',
      name: 'update-product-${self:provider.stage}',
      events: [
        {
          http: {
            path: 'product',
            method: 'put',
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
    productStatistics: {
      handler: 'src/lambdas/ProductStatistics/index.bootstrap',
      name: 'product-statistics-${self:provider.stage}',
      events: [
        {
          http: {
            path: 'product/statistics/{productId}',
            method: 'get',
          },
        },
      ],
    },
    getProduct: {
      handler: 'src/lambdas/GetProduct/index.bootstrap',
      name: 'get-product-${self:provider.stage}',
      events: [
        {
          http: {
            path: 'product/{id}',
            method: 'get',
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
    paymentMethodStatistics: {
      handler: 'src/lambdas/PaymentMethodStatistics/index.bootstrap',
      name: 'payment-method-statistics-${self:provider.stage}',
      events: [
        {
          http: {
            path: 'payment-method/statistics',
            method: 'get',
          },
        },
      ],
    },
    suppliersStatistics: {
      handler: 'src/lambdas/SuppliersStatistics/index.bootstrap',
      name: 'suppliers-statistics-${self:provider.stage}',
      events: [
        {
          http: {
            path: 'supplier/{supplierId}/statistics',
            method: 'get',
          },
        },
      ],
    },
    listCategories: {
      handler: 'src/lambdas/ListCategories/index.bootstrap',
      name: 'list-categories-${self:provider.stage}',
      events: [
        {
          http: {
            path: 'category/{userId}',
            method: 'get',
          },
        },
      ],
    },
    getStatistics: {
      handler: 'src/lambdas/GetStatistics/index.bootstrap',
      name: 'get-statistics-${self:provider.stage}',
      events: [
        {
          http: {
            path: 'statistics/{userId}',
            method: 'get',
          },
        },
      ],
    },
  },
  plugins: ['serverless-plugin-typescript', 'serverless-offline'],
};

module.exports = serverlessConfiguration;
