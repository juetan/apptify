import fs from 'fs';
import path from 'path';
import { generateApi } from 'swagger-typescript-api';

const resolve = (p) => path.resolve(process.cwd(), p);

const run = async () => {
  const arg = await generateApi({
    url: 'http://127.0.0.1:3030/openapi-json',
    output: resolve('./src/api/service'),
    name: 'index.ts',
    templates: './template',
    httpClientType: 'axios',
    moduleNameIndex: 1,
    prettier: {
      printWidth: 120,
      tabWidth: 2,
      trailingComma: 'all',
      parser: 'typescript',
    },
    cleanOutput: true,
    unwrapResponseData: true,
  });

  return;

  const { modelTypes, routes: _routes } = arg.configuration;
  const travel = (obj) => {
    let map = {};
    if (obj.type === 'object' && typeof obj.properties === 'object') {
      Object.keys(obj.properties).forEach((key) => {
        let type = '';
        const { type: _type, $ref, $parsed, format, description: label } = obj.properties[key];
        if (['isDelete'].includes(key)) {
          return;
        }
        if ($ref) {
          const _prop = modelTypes.find((i) => i.name === $parsed.name);
          if (!map[key]) {
            map[key] = {};
          }
          map[key] = travel(_prop);
          return;
        }
        if (_type === 'array') {
          const name = $parsed.items.$parsed.name;
          if (name === 'Tree') return;
          const _prop = modelTypes.find((i) => i.name === name);
          if (!map[key]) {
            map[key] = {};
          }
          map[key] = travel(_prop || {});
          return;
        }
        if (_type === 'string') {
          if (!format) {
            type = 'input';
          }
          if (format === 'date-time') {
            type = 'datePicker';
          }
        }
        if (_type === 'integer') {
          type = 'inputNumber';
        }
        map[key] = { id: key, label, type };
      });
    }
    return map;
  };

  const types = {};
  modelTypes.forEach((type) => {
    types[type.name] = travel(type);
  });

  const TypeMap = {
    string: 'input',
    integer: 'inputNumber',
  };

  const routes = _routes.combined?.reduce((map, module) => {
    const { moduleName: id, routes: _routes } = module;
    const routes = _routes.map((route) => {
      let request = {};
      let response = {};

      const { request: req, response: res, raw } = route;
      if (req.method === 'post') {
        request = types[req.payload.type];
      }
      if (req.method === 'update') {
        request = types[req.payload.type];
      }
      if (req.method === 'get' && req.requestParams) {
        const props = req.requestParams?.properties;
        Object.keys(props).forEach((key) => {
          request[key] = {
            type: TypeMap[props[key].type],
            label: props[key].description,
            id: props[key].name,
          };
        });
        response = types[res.type]?.data?.list || {};
      }
      if (req.method === 'get' && !req.requestParams) {
        response = types[res.type];
      }
      if (req.method === 'delete') {
        const props = req.requestParams?.properties;
        Object.keys(props).forEach((key) => {
          request[key] = {
            type: TypeMap[props[key].type],
            label: props[key].description,
            id: props[key].name,
          };
        });
      }

      const { summary: title, route: url, method } = raw;
      const id = route.routeName.usage;

      return { id, title, method, url, request, response };
    });
    map[id] = { id, title: module.routes[0].raw.tags?.[0], routes };
    return map;
  }, {});

  const data = JSON.stringify(routes);
  fs.writeFileSync(resolve('./scripts/run/data.json'), data);
};

run();
