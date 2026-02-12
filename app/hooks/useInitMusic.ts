import { useDispatch } from "react-redux";
import { initMusicRequest } from '../store/music/music.slice';

export function useInitMusic() {
    const dispatch = useDispatch();
    const initMusic = () => {
        dispatch(initMusicRequest());
    }
    return {initMusic};
}