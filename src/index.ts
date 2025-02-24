import { createIoCContainer } from './ioc/index';
import config from '../config.json';

import type { User, ApiConfig } from './types';

const ioc = createIoCContainer();
const logger = ioc.resolve('logger');

const apiConfigInstance: ApiConfig = {
    path: config.common.api.path,
    resources: config.common.api.resources
};

ioc.register('apiConfig', apiConfigInstance);

const renderUsers = async (config: ApiConfig) => {
  const usersService = ioc.resolve('users');
  const users = await usersService.getUsers();

  const listNode = document.getElementById('users-list');

  users.forEach((user: User) => {
    const listItemNode = document.createElement('li');

    listItemNode.innerHTML = user.name;
    listNode.appendChild(listItemNode);
  });
};

const app = () => {
  const config = (window as any).__CONFIG__;
  delete (window as any).__CONFIG__;

  renderUsers(config.api);
};

window.onload = (event: Event) => {
  logger.info('Page is loaded.');

  app();
};
