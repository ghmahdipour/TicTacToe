import React from 'react';
import { Text, View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Images from '../../resources/images';
import language from '../../languages/tokens';
import { PlayerEnum } from '../../enums/board.enum';
import type { PlayerRole } from '../../types/board.type';
import styles from './index.style';

type Props = {
    myTurn?: boolean;
    playerRole: PlayerRole | null;
    winner: PlayerEnum | 'Draw' | null;
    isLocal?: boolean;
}

const TurnIndicator = ({ myTurn, playerRole, isLocal,winner }: Props) => {
    let activeSymbol: PlayerEnum;
        activeSymbol = winner && winner !== 'Draw' 
        ? winner
        : isLocal 
            ? (myTurn ? PlayerEnum.x : PlayerEnum.o)
            : playerRole === 'x'
                ? (myTurn ? PlayerEnum.x : PlayerEnum.o)
                : (myTurn ? PlayerEnum.o : PlayerEnum.x);
                
    const XIcon = Images.players.x;
    const OIcon = Images.players.o;

    // else {
    //     const isX = playerRole === 'x';
    //     const mySymbol = isX ? PlayerEnum.x : PlayerEnum.o;
    //     const opponentSymbol = isX ? PlayerEnum.o : PlayerEnum.x;
    //     activeSymbol = myTurn ? mySymbol : opponentSymbol;
    // }
    return (
            <View style={styles.row}>
                <Animatable.View 
                    animation={activeSymbol === PlayerEnum.x ? 'pulse' : undefined}
                    iterationCount="infinite"
                    duration={900}
                    style={[
                        styles.symbolBox,
                        activeSymbol === PlayerEnum.x && styles.activeSymbol
                    ]}
                >
                    <Image source={XIcon} style={styles.symbolIcon} />
                    <Text style={[styles.symbolLabel, styles.labelX]}>{language.tokens['PLAYER1']}</Text>
                </Animatable.View>
                <Animatable.View 
                    animation={activeSymbol === PlayerEnum.o ? 'pulse' : undefined}
                    iterationCount="infinite"
                    duration={900}
                    style={[
                        styles.symbolBox,
                        activeSymbol === PlayerEnum.o && styles.activeSymbol
                    ]}
                >
                    <Image source={OIcon} style={styles.symbolIcon} />
                    <Text style={[styles.symbolLabel, styles.labelO]}>{language.tokens['PLAYER2']}</Text>
                </Animatable.View>
            </View>
    )
}

export default TurnIndicator;