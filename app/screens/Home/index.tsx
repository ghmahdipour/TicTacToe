import React, { useEffect, useReducer } from 'react';
import { View, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RoomModal, Animation, Button, Text, ErrorModal, Loading } from '../../components';
import language from '../../languages/tokens';
import Images from '../../resources/images';
import { GAME_TYPE } from '../../constants/home';
import { useBackgroundMusic, useAudio, useInitMusic } from '../../hooks';
import { joinRoomRequest, setError, resetAllState } from '../../store/board/board.slice';
import { homeReducer, initialState } from '../../reducers/home.reducer';
import {  
    selectRoomId, 
    selectRoomLoading, 
    selectRoomError,
    selectRoomJoined
} from '../../store/board/board.selector';
import { type HomeScreenNavigationProp } from '../../types/navigation.type';
import { type GameMode } from '../../types/home.type';
import styles from './index.style';

type Props = {
    navigation: HomeScreenNavigationProp;
}

const HomeScreen = ({ navigation }: Props) => {
    const [state, dispatchLocal] = useReducer(homeReducer, initialState);
    // Hooks
    const joined = useSelector(selectRoomJoined);
    const roomId = useSelector(selectRoomId);
    const loading = useSelector(selectRoomLoading);
    const error = useSelector(selectRoomError);

    const { triggerButtonSound, triggerBackSound } = useAudio();
    const { isPlaying, toggleMusic } = useBackgroundMusic();
    const { initMusic } = useInitMusic();
    const dispatch = useDispatch();

    useEffect(() => {
        initMusic();
        dispatch(resetAllState());
    }, []);

    useEffect(() => {
        if(error) {
            dispatchLocal({ type: 'SHOW_ERROR', payload: error });
        }
    }, [error])

    useEffect(() => {
        if(joined && roomId) navigation.navigate('Board', { 
            // ...DEFAULT_BOARD_POSITION,
            roomCode: roomId
         })
    }, [joined, roomId])

    // Helpers
    const closeModal = () => dispatchLocal({ type: 'CLOSE_MODAL' });

    const withSoundAndClose = (fn: () => void) => () => {
        triggerBackSound();
        fn();
        dispatchLocal({ type: 'CLOSE_MODAL' });
    }

    const goToLevel = (mode: GameMode) => navigation.navigate('Level', { type: mode });

    const gameStrategies: Record<keyof typeof GAME_TYPE, () => void> = {
        SELF: () => goToLevel(GAME_TYPE.SELF as GameMode),
        ONLINE: () => goToLevel(GAME_TYPE.ONLINE as GameMode)
    }

    // Handlers
    const handleJoinRoom = () => {
        if(!state.roomCode.trim()) {
            dispatchLocal({ type: 'SHOW_ERROR', payload: language.tokens['ERROR_JOIN_ROOM'] });
            return;
        }
        triggerButtonSound();
        dispatch(joinRoomRequest({ roomId: state.roomCode }));
        dispatchLocal({ type: 'SET_ROOM_CODE', payload: '' });
        dispatchLocal({ type: 'CLOSE_MODAL' });
    }

    const handleCreateRoom = withSoundAndClose(() => gameStrategies.ONLINE());
        
    const onPressOnline = () => {
        triggerButtonSound();
        dispatchLocal({ type: 'OPEN_MODAL' });
    }

    const onChangeMusic = () => {
        triggerButtonSound();
        toggleMusic();
    }

    const onCloseErrorModal = () => {
        dispatchLocal({ type: 'RESET_ERROR' });
        dispatch(setError(null));
    }

    const onPressClose = () => {
        triggerBackSound();
        dispatchLocal({ type: 'SET_ROOM_CODE', payload: '' });
        dispatchLocal({ type: 'CLOSE_MODAL' });
    }

    return (<>
            <Loading visible={!!loading} />
            <RoomModal
                visible={state.visible}
                roomCode={state.roomCode}
                closeModal={closeModal}
                onPressClose={onPressClose}
                setRoomCode={(code: string) => dispatchLocal({ type: 'SET_ROOM_CODE', payload: code })}
                handleJoinRoom={handleJoinRoom}
                handleCreateRoom={handleCreateRoom}
            />
            <ErrorModal 
                visible={state.errorModal}
                message={state.errorMessage ?? ''}
                onClose={onCloseErrorModal}
            />
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text customStyles={styles.text}>{language.tokens['TIC_TOC_TOE']}</Text> 
                </View>
                <View style={styles.buttons}>
                    <Button onPress={() => withSoundAndClose(() => gameStrategies.SELF())()}>
                        <Text customStyles={styles.btnText}>{language.tokens['SELF']}</Text>
                    </Button>
                    <Button onPress={onPressOnline}>
                        <Text customStyles={styles.btnText}>{language.tokens['ONLINE']}</Text>
                    </Button>
                </View>
                <View style={styles.btnBox}>
                    <Button customStyle={styles.extraBtn} onPress={onChangeMusic}>
                        <Animated.Image source={isPlaying ? Images.sound.unmute : Images.sound.mute} style={styles.musicIcon} />
                    </Button>
                </View>
            </View>
            <View style={styles.animationBox}>
                <Animation />
            </View>
    </>)
}

export default HomeScreen;