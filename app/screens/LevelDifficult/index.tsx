import React, { useEffect, useRef, useState, useReducer } from 'react';
import { View, Image, findNodeHandle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { TopBar, Button, Text, ErrorModal, Loading } from '../../components';
import { useAudio } from '../../hooks';
import { createRoomRequest, setError } from '../../store//board/board.slice';
import language from '../../languages/tokens';
import { levelDifficultReducer, initialState } from '../../reducers/levelDifficult.reducer';
import { LEVEL_OPTIONS } from '../../constants/board';
import { LEVEL_MAP } from '../../constants/board';
import { GAME_TYPE } from '../../constants/home';
import { selectRoomId, selectRoomLoading, selectRoomError } from '../../store/board/board.selector';
import { type RootStackParamList } from '../../types/navigation.type';
import { type GameMode } from '../../types/home.type';
import { type BoardMode } from '../../types/board.type';
import styles from './index.style';

type Props = StackScreenProps<RootStackParamList, 'Level'>;

const LevelDifficultScreen = ({ route, navigation }: Props) => {
    const { type } = route.params;
    const [state, dispatchLocal] = useReducer(levelDifficultReducer, initialState);
    const [pendingNav, setPendingNav] = useState<{ref: View | null; level: BoardMode} | null>(null);
    const iconRefs = useRef<(View | null)[]>([]);

    const roomId = useSelector(selectRoomId);
    const loading = useSelector(selectRoomLoading);
    const error = useSelector(selectRoomError);

    const dispatch = useDispatch();
    const { triggerButtonSound, triggerBackSound } = useAudio();
  
    useEffect(() => {
        if(error) {
            dispatchLocal({ type: 'SHOW_ERROR', payload: error });
        }
    }, [error])

    useEffect(() => {
        if(roomId && pendingNav) {
            navigateWithMeasure(pendingNav.ref, { 
                level: pendingNav.level, 
                mode: GAME_TYPE.ONLINE, 
                roomCode: roomId 
            });
            setPendingNav(null);
        }
    }, [roomId, pendingNav])

    const navigateWithMeasure = (
        ref: View | null,
        params: { level: BoardMode, mode: GameMode, roomCode?: string }
    ) => {
        const handle = findNodeHandle(ref);
        if(!handle) return;
    
        ref?.measureInWindow((x: number, y: number, width: number, height: number) => {
            navigation.navigate('Board', {
                startX: x,
                startY: y,
                startW: width,
                startH: height,
                ...params
            })
        })
    }

    const setIconRef = (index: number, el: View | null) => {
        iconRefs.current[index] = el
    }

    const handlePress = (index: number, mode: GameMode, level: BoardMode) => {
        const ref = iconRefs.current[index];
        if(!ref) return;
        
        if(mode === GAME_TYPE.SELF) {
            navigateWithMeasure(ref, { level, mode: GAME_TYPE.SELF });
        } else if (mode === GAME_TYPE.ONLINE) {
            const { size, winLen } = LEVEL_MAP[level];
            setPendingNav({ ref, level });
            dispatch(createRoomRequest({ level, size, winLen}));
        }
        triggerButtonSound();
    }

    const handleBack = () => {
        triggerBackSound();
        navigation.navigate('Home');
    }

    const onCloseErrorModal = () => {
        dispatchLocal({ type: 'RESET_ERROR' });
        dispatch(setError(null));
    }
  
    return (<>
            <Loading visible={!!loading} />
            <ErrorModal 
                visible={state.errorModal}
                message={state.errorMessage ?? ''}
                onClose={onCloseErrorModal}
            />
            <TopBar onPress={handleBack} />
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text customStyles={styles.title}>{language.tokens['LEVEL_DIFFICULT']}</Text> 
                </View>
                <View style={styles.buttons}>
                    {LEVEL_OPTIONS.map((lo, index) => (
                        <Button 
                            key={lo.mode} 
                            ref={(el: View | null) => setIconRef(index, el)} 
                            onPress={() => handlePress(index, type, lo.mode)}>
                            
                            <Image source={lo.icon} style={styles.image}/>
                            <Text customStyles={styles.btnText}>{lo.label}</Text>
                        </Button>
                    ))}
                </View>
            </View>
        </>
    )
}


export default LevelDifficultScreen;