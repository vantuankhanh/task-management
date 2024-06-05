/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_SOCKET_IO_URL: string;
    REACT_APP_BASE_URL: string;
    REACT_APP_URL_LOGIN: string;
    REACT_APP_URL_REFRESH_TOKEN: string;
    REACT_APP_URL_CREATE_PASSWORD: string;
    REACT_APP_URL_SEND_VERIFY_CODE: string;
    REACT_APP_URL_VALIDATE_CODE: string;
    REACT_APP_URL_GET_EMPLOYEE: string;
    REACT_APP_URL_CREATE_EMPLOYEE: string;
    REACT_APP_URL_UPDATE_EMPLOYEE: string;
    REACT_APP_URL_GET_TASK: string;
    REACT_APP_URL_CREATE_TASK: string;
    REACT_APP_URL_UPDATE_TASK: string;
    REACT_APP_URL_GET_MESSAGE: string;
    REACT_APP_URL_CREATE_MESSAGE: string;
  }
}
