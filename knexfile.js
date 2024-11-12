import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const knexConfig = {
  development: {
    client: 'mysql', // Ou 'mysql2', dependendo do pacote que você instalou
    connection: 
    { 
       host: unction.proxy.rlwy.net,
      user: root,
      password: NRlJClbdtIoJUWCeXEYbnpYMFyGSWeqb,
      database: railway,
      port: 43631,
    },
    migrations: {
      directory: path.join(__dirname, 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'seeds'),
    },
  },
  production: {
    client: 'mysql',
    connection: {
      host: unction.proxy.rlwy.net,
      user: root,
      password: NRlJClbdtIoJUWCeXEYbnpYMFyGSWeqb,
      database: railway,
      port: 43631,
    },
    migrations: {
      directory: path.join(__dirname, 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'seeds'),
    },
  }
};




export default knexConfig;
