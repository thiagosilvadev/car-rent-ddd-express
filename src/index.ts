import 'reflect-metadata';

import application from './server';
import * as http from 'http';
const PORT = process.env.PORT || 3001;

const server = http.createServer(application.instance);

server.listen(PORT, () => {
  console.log(`Server is listening on :${PORT}`);
});