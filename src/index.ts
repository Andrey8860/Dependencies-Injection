import { createIoCContainer } from './ioc/index';
import { Users } from './services/users';
import { Logger } from './services/logger';

import type { User, ApiConfig } from './types';

const ioc = createIoCContainer();
const usersService = ioc.resolve('users');
const logger = ioc.resolve('logger');
const http = ioc.resolve('http');

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
  const logger = new Logger();

  logger.info('Page is loaded.');

  app();
};
