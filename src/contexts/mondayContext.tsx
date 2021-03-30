import {createContext} from 'react';
import { Monday } from 'types/monday';

export const MondayContext = createContext<Monday.Context | undefined>(undefined);
export const MondayProvider = MondayContext.Provider;