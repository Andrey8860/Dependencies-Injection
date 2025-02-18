import IoCContainer from 'ioc-lite';
import config from '../../config.json';

import { Logger } from '../services/logger';
import { HTTP } from '../services/http';
import { Users } from '../services/users';

import type { ApiConfig } from '../types';

export const createIoCContainer = () =>  {
  const ioc = new IoCContainer();
  // you can register some resources right now below...
  ioc.registerClass('logger', Logger);
  ioc.registerClass('http', HTTP);
  ioc.registerClass('users', Users);

  const apiConfigInstance: ApiConfig = {
      path: config.common.api.path,
      resources: config.common.api.resources
  };

  ioc.register('apiConfig', apiConfigInstance);

  return ioc;
};



