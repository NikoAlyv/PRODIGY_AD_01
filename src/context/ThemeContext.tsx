import {createContext} from 'react';
import {colors} from '../theme/Colors';

export const ThemeContext = createContext('light');
export const ColorContext = createContext(colors.blue);
