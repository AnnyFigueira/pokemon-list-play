import './styles.scss';

import {route, config, ready} from 'nullstack';

config('database.url', 'mongodb://localhost:27017/Pokemon'); //server
config('database.name', 'Pokemon'); //server
config('session.secret', 'c0ae8ba750e5d39dc78cd60a30960e7fee295c9e33930c0622fa008113883e3b'); //server
config('server.port', 3769); //server

config('storage.type', 'disk'); //server
config('storage.key', 'KEY'); //server
config('storage.secret', 'SECRET'); //server
config('storage.region', 'sa-east-1'); //server
config('storage.bucket', 'BUCKET'); //server

config('default.description', 'TODO');
config('default.project', 'TODO');
config('default.image', 'TODO');
config('default.domain', 'TODO');
config('default.locale', 'TODO');
config('default.protocol', 'https');
config('default.path', '/');
config('default.type', 'website');

import Dashboard from './dashboard';
route('/', Dashboard);

ready();
