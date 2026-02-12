import React, { ReactNode } from 'react';
import { View, Modal } from 'react-native';
import styles from './index.style';

type Props = {
    visible: boolean;
    closeModal?: () => void;
    children: ReactNode;
}

const BaseModal = ({ visible, closeModal, children }: Props) => {
    return (
        <Modal visible={visible} transparent animationType='slide' onRequestClose={closeModal}>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    {children}
                </View>
            </View>
        </Modal>
    )
}

export default BaseModal;