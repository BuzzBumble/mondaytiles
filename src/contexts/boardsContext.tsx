import {createContext} from 'react';
import { Monday } from 'types/monday';

export const BoardContext = createContext<Monday.Board | undefined>(undefined);
export const BoardProvider = BoardContext.Provider;