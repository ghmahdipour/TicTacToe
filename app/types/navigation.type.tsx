import { StackNavigationProp } from '@react-navigation/stack';
import type { BoardMode } from './board.type';
import type { GameMode } from './home.type';

export type RootStackParamList = {
   Splash: undefined,
   Home: undefined,
   Level: {
      type: GameMode;
   },
   Board: {
      mode?: GameMode;
      roomCode?: string;
      level?: BoardMode;
      startX?: number;
      startY?: number;
      startW?: number;
      startH?: number;
   }
}

export type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>