import { ImageSourcePropType } from "react-native";
import { LEVELS } from '../constants/board';
import { PlayerEnum } from "../enums/board.enum";

export type Player = 'X' | 'O' | '';
export type CellIndex = number;

export type BoardMode = 'easy' | 'medium' | 'hard';
export type Level = typeof LEVELS[keyof typeof LEVELS];
type RoomMoves = Record<string, Move>;

export type LevelOptionsType = {
	mode: BoardMode;
    label: Level;
    icon: ImageSourcePropType;
};

export type Move = {
    index: CellIndex;
    player: Player;
}

export type RoomData = {
    level: BoardMode;
    size: number;
    winLen: number;
    players?: string[];
    moves?: RoomMoves;
    resetRequestedBy?: PlayerRole;
    resetConfirmBy?: Partial<Record<PlayerRole, boolean>>;
}

export type PlayerRole = keyof typeof PlayerEnum;

