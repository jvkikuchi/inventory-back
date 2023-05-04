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
  },
  plugins: ['serverless-plugin-typescript', 'serverless-offline'],
};

module.exports = serverlessConfiguration;
