import { createContext, useState } from 'react';
import { getToken } from './../components/StoringData';

function createStore() {
    test = getToken('isAuthenticated');
    const [isAuthenticated, setIsAuthenticated] = useState(getToken('isAuthenticated'));
    const [tokenCreationDate, setTokenCreationDate] = useState(getToken('tokenCreation'));
    
    return ({
        isAuthenticated,
        setIsAuthenticated,
        tokenCreationDate,
        setTokenCreationDate,
    })
}

export const StoreContext = createContext(createStore);
export default createStore;