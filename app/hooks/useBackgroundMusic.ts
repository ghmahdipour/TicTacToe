import { useDispatch, useSelector } from "react-redux";
import { startMusic, stopMusic } from '../store/music/music.slice';
import { type RootState } from "../store";

export function useBackgroundMusic() {
    const isPlaying = useSelector((state: RootState) => state.music.isPlaying);
    const dispatch = useDispatch();

    const toggleMusic = () => {
        if(isPlaying) {
            dispatch(stopMusic());
        } else {
            dispatch(startMusic());
        }
    }
    return { isPlaying, toggleMusic }
}