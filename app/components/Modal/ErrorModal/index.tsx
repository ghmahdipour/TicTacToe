import React from 'react';
import styles from './index.style';
import language from '../../../languages/tokens';
import { Button, Text, Modal } from '../..'

type Props = {
    visible: boolean;
    message: string | null;
    onClose: () => void;
}

const ErrorModal = (props: Props) => {
    return (
        <Modal visible={props.visible} closeModal={props.onClose}>
            <Text customStyles={styles.message}>{props.message || 'An error has occurred'}</Text>
            <Button customStyle={styles.btn} onPress={props.onClose}>
                <Text customStyles={styles.text}>{language.tokens['OK']}</Text>
            </Button>
        </Modal>
    )
}

export default ErrorModal;