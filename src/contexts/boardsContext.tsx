import {createContext} from 'react';

const BoardsContext = createContext([]);

export const BoardsProvider = BoardsContext.Provider;

export default BoardsContext;