import { GAME_TYPE } from '../constants/home';

export type GameMode = typeof GAME_TYPE[keyof typeof GAME_TYPE];