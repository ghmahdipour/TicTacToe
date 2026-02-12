import { useDispatch } from "react-redux";
import { 
    BackSound,
    ButtonSound, 
    MoveSound,
    WinSound,
    DrawSound
} from "../store/audio/audio.slice";
import { type PlayerRole } from '../types/board.type';

export function useAudio() {
    const dispatch = useDispatch();
    return {
        triggerMoveSound: (player: PlayerRole) => {
            dispatch(MoveSound(player));
        },
        triggerWinSound: () => {
            dispatch(WinSound());
        },
        triggerButtonSound: () => {
            dispatch(ButtonSound());
        },
        triggerBackSound: () => {
            dispatch(BackSound());
        },
        triggerDrawSound: () => {
            dispatch(DrawSound());
        }
    }
}