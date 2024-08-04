import { createContext } from 'react';
import constants from './constants';

const authContext = createContext(constants.authStatus.loading);

export default authContext;
