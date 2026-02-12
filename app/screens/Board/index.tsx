import React, { useEffect, useRef } from 'react';
import { View, Image, Animated } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { TopBar, Board, Button, Text, Toast, SvgCircle, ResetConfirmModal, TurnIndicator } from '../../components';
import { useAudio, useOnlineGame, useSelfGame } from '../../hooks';
import { RootStackParamList } from '../../types/navigation.type';
import language from '../../languages/tokens';
import Images from '../../resources/images';
import { resetAllState, setModalVisible } from '../../store/board/board.slice';
import { LEVEL_MAP, LEVEL_ICON, getWinnerIcon } from '../../constants/board';
import { PlayerEnum } from '../../enums/board.enum';
import { selectBoardSize, selectLevel, selectWinLen, selectRoomId } from '../../store/board/board.selector';
import { type BoardMode } from '../../types/board.type';
import styles from './index.style';

type Props = StackScreenProps<RootStackParamList, 'Board'>;

const BoardScreen = ({ route, navigation }: Props) => {
   const { startX, startY, mode, roomCode } = route.params;
   // Mode must be remove
   const dispatch = useDispatch();
   const roomId = useSelector(selectRoomId);

    const isOnline = !!(roomCode || roomId);
   const size = useSelector(selectBoardSize);
   const level = useSelector(selectLevel);
   const winLen = useSelector(selectWinLen);

   const selectedLevel = (isOnline ? level : route.params.level) as BoardMode;
    const { 
        size: selectedSize, 
        winLen: selectedWinLen 
    } = isOnline ? { size: size ?? 3, winLen: winLen ?? 3 } : LEVEL_MAP[selectedLevel]

    const animX = useRef(new Animated.Value(startX ?? 0)).current;
    const animY = useRef(new Animated.Value(startY ?? 0)).current;
    const levelIconRef = useRef<Animatable.View & View>(null);
    const hintTimeOutRef = useRef<number | null>(null);

    const { triggerMoveSound, triggerWinSound, triggerBackSound, triggerButtonSound, triggerDrawSound } = useAudio();
   
    const selfGame = useSelfGame({
        enabled: !isOnline,
        size: selectedSize,
        winLen: selectedWinLen,
        triggerMoveSound,
        triggerWinSound,
        triggerDrawSound
    })

    const onlineGame = useOnlineGame({
        enabled: isOnline,
        size: selectedSize,
        roomCode,
        triggerMoveSound,
        triggerWinSound,
        triggerDrawSound
    })

    const currentCells = isOnline ? onlineGame.cells : selfGame.cells;
    const currentWinner = isOnline ? onlineGame.winner : selfGame.winner;
    const myTurn = isOnline ? onlineGame.myTurn : selfGame.myTurn;
    
    useEffect(() => {
        Animated.spring(animX,{ toValue: 10, useNativeDriver: false }).start();
        Animated.spring(animY,{ toValue: 10, useNativeDriver: false }).start();
  
        return () => {
            if(hintTimeOutRef.current !== null) clearTimeout(hintTimeOutRef.current)
        }
    }, [])

    useEffect(() => {
        if(onlineGame.opponentLeft) {
            setTimeout(() => {
                navigation.navigate("Home");
                // Clear online state
                dispatch(resetAllState());
            }, 1500);
        }
    }, [onlineGame.opponentLeft]);

    useEffect(() => {
        if(onlineGame.resetRequester && onlineGame.resetRequester !== onlineGame.playerRole && isOnline) {
            dispatch(setModalVisible(true));
        }
    }, [onlineGame.resetRequester, onlineGame.playerRole, isOnline])

    const handlePressCell = (index: number) => {
        if(isOnline) onlineGame.handleMove(index);
        else selfGame.handleMove(index);
    }

    const handleResetGame = () => {
        triggerButtonSound();
        if(isOnline) onlineGame.handleReset();
        else selfGame.handleReset();
    };

    const handleBack = () => {
        triggerBackSound();
        if(isOnline) onlineGame.handleBack();
        // Clear self state
        else selfGame.handleReset();
        // Navigate to home page
        navigation.navigate('Home');
    }

    const startHintLevel = () => {
        levelIconRef.current?.animate('pulse', 1500).then(() => {
            hintTimeOutRef.current = setTimeout(startHintLevel, 1500);
        });
    }

    return (<>
            <TopBar onPress={handleBack} />
            <Toast 
                visible={onlineGame.opponentLeft}
                message={language.tokens['OPPONENT_LEFT_BOARD']}
                duration={1500}
            />
            {isOnline && (<ResetConfirmModal
                visible={onlineGame.modalVisible && onlineGame.resetRequester !== onlineGame.playerRole}
                requester={onlineGame.resetRequester} 
                playerRole={onlineGame.playerRole}
                onConfirm={onlineGame.handleConfirmReset}
                onReject={onlineGame.rejectReset}
            />)}
            <Toast 
                visible={isOnline && onlineGame.resetRequester === onlineGame.playerRole}
                message={language.tokens['WAIT_CONFIRMATION']}
            />
            <View style={styles.header}>
                <TurnIndicator 
                    isLocal={!isOnline}
                    myTurn={myTurn}
                    winner={currentWinner}
                    playerRole={isOnline ? onlineGame.playerRole : null}
                />
                <View style={styles.mainContent}>
                    <View>
                        <Animatable.View
                            ref={levelIconRef}
                            animation="bounceIn"
                            delay={100}
                            onAnimationEnd={startHintLevel}
                         >
                            <SvgCircle count={selectedWinLen} />
                        </Animatable.View>
                    </View>
                    {onlineGame.roomId && <Text>{onlineGame.roomId}</Text>}
                    {selectedLevel &&
                        <Animated.View style={{ right: animX, top: animY }}>
                            <Image source={LEVEL_ICON[selectedLevel as BoardMode]} style={{ width: 50, height: 50 }}/>
                        </Animated.View>
                    }
                </View>
            </View>
            <View style={styles.center}>
                {onlineGame.isLoadingOnline ? (
                    <Text>Loading...</Text>
                ) : (<>
                    <Board 
                        size={selectedSize} 
                        cells={currentCells}
                        disabled={isOnline ? !myTurn : false}
                        onPress={handlePressCell}
                    />
                    {currentWinner && (
                        <Animatable.View  
                            animation="slideInDown" 
                            duration={600} 
                            easing="ease-out-back"
                            style={styles.resultBox}
                        >
                                <View style={styles.resultContent}>
                                    {getWinnerIcon(currentWinner as PlayerEnum)}
                                    <Text customStyles={styles.winText}>
                                        {currentWinner === PlayerEnum.x 
                                        || currentWinner === PlayerEnum.o 
                                        ? `${language.tokens['WINS']}!` : 
                                        `${language.tokens['DRAW']}!`
                                        }
                                    </Text>
                                </View>
                            </Animatable.View>
                    )}
                </>)}
            </View>
            <View style={styles.footer}>
                <Button 
                    disabled={isOnline && onlineGame.playerRole === 'o' && !onlineGame.winner} 
                    customStyle={styles.btnBox} 
                    onPress={handleResetGame}
                >
                    <Image source={Images.reset} style={styles.resetIcon} />
                </Button>
            </View>
        </>)
}

export default BoardScreen;