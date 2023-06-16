import path from 'path';
import { generateApi, } from 'swagger-typescript-api';

const resolve = (p) => path.resolve(process.cwd(), p);

const run = async () => {
  const output = await generateApi({
    url: 'http://127.0.0.1:3030/openapi-json',
    templates: resolve('./scripts/openapi/template'),
    output: resolve('./src/api/service'),
    name: 'index.ts',
    singleHttpClient: false,
    httpClientType: 'axios',
    unwrapResponseData: true,
    moduleNameIndex: 1,
    moduleNameFirstTag: true,
    cleanOutput: true,
    // generateRouteTypes: true,
    extractRequestParams: true,
    modular: false,
    prettier: {
      printWidth: 120,
      tabWidth: 2,
      trailingComma: 'all',
      parser: 'typescript',
    },
  });
  // const { configuration, getTemplate, renderTemplate, createFile } = output
  // const { config } = configuration
  // const { templateInfos } = config
  // const templateMap = templateInfos.reduce((acc, { fileName, name }) => ({
  //   ...acc,
  //   [name]: getTemplate({ fileName, name }),
  // }),
  //   {});
  // const files = [
  //   {
  //     path: config.output,
  //     fileName: 'dataContracts.ts',
  //     content: renderTemplate(templateMap.dataContracts, configuration),
  //   },
  //   {
  //     path: config.output,
  //     fileName: 'httpClient.ts',
  //     content: renderTemplate(templateMap.httpClient, configuration),
  //   },
  //   {
  //     path: config.output,
  //     fileName: 'apiClient.ts',
  //     content: renderTemplate(templateMap.api, configuration),
  //   }
  // ]
  // for (const file of files) {
  //   createFile(file)
  // }
  return output;
};

run();
