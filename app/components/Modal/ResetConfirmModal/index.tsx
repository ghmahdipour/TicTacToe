import React from 'react';
import { View } from 'react-native';
import { Button, Text, Modal } from '../..'
import type { PlayerRole } from '../../../types/board.type';
import language from '../../../languages/tokens';
import styles from './index.style';
import { denyReset } from '../../../store/board/board.slice';
import { useDispatch } from 'react-redux';

type Props = {
    visible: boolean;
    requester?: PlayerRole | null;
    playerRole: PlayerRole;
    onConfirm: () => void;
    onReject?: () => void;
}

const ResetConfirmModal = (props: Props) => {
    const dispatch = useDispatch();

    if(!props.visible) return null;

    const handleReject = () => {
        dispatch(denyReset());
        if(props.onReject) props.onReject();
    }
    return (
        <Modal visible={props.visible}>
           <Text customStyles={styles.text}>{language.tokens['PLAYER']} {props.requester} {language.tokens['RESET_REQUEST']}</Text>
           <View style={styles.content}>
                <Button onPress={props.onConfirm}>
                    <Text customStyles={styles.btnText}>{language.tokens['CONFIRM']}</Text>
                </Button>
                <Button onPress={handleReject}>
                    <Text customStyles={styles.btnText}>{language.tokens['DENY']}</Text>
                </Button>
           </View>
        </Modal>
    )
}

export default ResetConfirmModal;