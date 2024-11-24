declare global {
  interface ImportMetaEnv {
    VITE_SERVER_URL: string;
  }
}

interface Config {
  serverUrl: string;
  isDevelopment: boolean;
}

export const config: Config = {
  serverUrl: import.meta.env.VITE_SERVER_URL,
  isDevelopment: import.meta.env.DEV,
} as const;

if (!config.serverUrl) {
  throw new Error("VITE_SERVER_URL is not defined");
}
