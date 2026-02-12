import { useEffect} from 'react';
import { useDispatch } from "react-redux";
import { AppState, AppStateStatus } from 'react-native';
import { pauseMusic, resumeMusic } from '../store/music/music.slice';
import { loadMusicPreference } from '../utils/musicPreference';
import { loadEffects } from '../store/audio/effects';
import { initMusic } from '../store/music/music';

export function useAppStateMusic() {
    const dispatch = useDispatch();
    useEffect(() => { 
        loadEffects();
        initMusic();
        const subscription = AppState.addEventListener('change', async (nextState: AppStateStatus) => {
            if(nextState === 'background') {
                dispatch(pauseMusic());
            } else if (nextState === 'active') {
                const enabled = await loadMusicPreference();
                if(enabled) dispatch(resumeMusic());
            }
        });
        return () => subscription.remove();
    }, []);
}