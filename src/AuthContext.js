import constants from './constants';
import { createContext } from 'react';

const authContext = createContext(constants.authStatus.loading);

export default authContext;
