import React from 'react';
import { View, TextInput, Image } from 'react-native';
import Images from '../../../resources/images';
import language from '../../../languages/tokens';
import { Button, Text, Modal } from '../..';
import styles from './index.style';

type Props = {
    visible: boolean;
    closeModal: () => void;
    onPressClose: () => void;
    roomCode: string;
    setRoomCode: (code: string) => void;
    handleJoinRoom: () => void;
    handleCreateRoom: () => void;
}

const RoomModal = (props: Props) => {
    return (
        <Modal visible={props.visible} closeModal={props.closeModal}>
            <Button customStyle={styles.closeBtn} onPress={props.onPressClose}>
                <Image source={Images.close} style={styles.close} />
            </Button>
            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    placeholder="Room code"
                    value={props.roomCode}
                    onChangeText={props.setRoomCode}
                />
                <Button onPress={props.handleJoinRoom}>
                    <Text customStyles={styles.btnText}>{language.tokens['JOIN']}</Text>
                </Button>
            </View>
            <Text customStyles={styles.text}>{language.tokens['OR']}</Text>
            <Button onPress={props.handleCreateRoom}>
                <Text customStyles={styles.btnText}>{language.tokens['CREATE']}</Text>
            </Button>
        </Modal>
    )
}

export default RoomModal;