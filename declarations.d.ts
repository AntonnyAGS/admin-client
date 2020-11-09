declare namespace NodeJS {
  export interface ProcessEnv {
    API_URL: string;
    TOKEN: string;
    REFRESH_TOKEN: string;
    SECRET_LOCAL_KEY: string;
  }
}
