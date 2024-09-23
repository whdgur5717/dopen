import { DefaultApi } from './generate/api';
import { Configuration } from './generate/configuration';

const config = new Configuration({
  basePath: `${import.meta.env.VITE_APP_URL}:${import.meta.env.VITE_APP_PORT}`,
});

export const api = new DefaultApi(config);
