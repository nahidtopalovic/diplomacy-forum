import React, { createContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthUserContext';
import baseURL from '../constants/baseURL';

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
    const { authUser } = useAuth();

    const authAxios = axios.create({
        baseURL,
    });

    authAxios.interceptors.request.use(
        (config) => {
            config.headers.myauth = `Bearer ${authUser?.token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    authAxios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            const code = error && error.response ? error.response.status : 0;
            if (code === 401 || code === 403) {
                console.log('error code', code);
            }
            return Promise.reject(error);
        }
    );

    return <Provider value={{ authAxios }}>{children}</Provider>;
};

export { FetchContext, FetchProvider };
