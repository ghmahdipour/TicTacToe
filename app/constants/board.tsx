import React, { ReactNode } from 'react';
import { ImageSourcePropType, Image, Dimensions } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Svg, {Circle} from 'react-native-svg';
import { PlayerEnum } from '../enums/board.enum';
import Images from '../resources/images';
import type { BoardMode, LevelOptionsType } from '../types/board.type';

export const LEVEL_MAP = {
    easy: { size: 3, winLen: 3},
    medium: { size: 6, winLen: 4},
    hard: { size: 9, winLen: 5}
} as const;

export const LEVELS = {
    EASY: "Easy",
	MEDIUM: "Medium",
    HARD: "Hard"
} as const;

export const LEVEL_OPTIONS: LevelOptionsType[] = [
    { mode: 'easy', label: LEVELS.EASY, icon: Images.level.easy},
    { mode: 'medium', label: LEVELS.MEDIUM, icon: Images.level.medium},
    { mode: 'hard', label: LEVELS.HARD, icon: Images.level.hard},
]

export const LEVEL_ICON: Record<BoardMode, ImageSourcePropType> = {
    easy: Images.level.easy,
    medium: Images.level.medium,
    hard: Images.level.hard,
};

export const getWinnerIcon = (winner: PlayerEnum) => {
    const winnerMap: Record<PlayerEnum, ReactNode> = {
        [PlayerEnum.x]: (
            <Image source={Images.players.loser} style={{
                width: wp(13),
                height: wp(13)
            }} />
        ),
        [PlayerEnum.o]: (
            <Svg height={wp(13)} width={wp(13)} viewBox="0 0 100 100">
                <Circle cx="50" cy="50" r="40" stroke="black" strokeWidth="20" fill="transparent" />
            </Svg>
        ),
    };
    return winnerMap[winner];
};

const screenWidth = Dimensions.get('window').width;
export const BOARD_SIZE = screenWidth * 0.9;