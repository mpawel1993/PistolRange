import {Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import Field from "./field";
import NavigationField from "./navigation-field";

const FromBeginningModal = ({isModalVisible, userResponse}) => {

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(isModalVisible);
    }, [isModalVisible]);

    const pickYes = () => {
        setModalVisible(false);
        userResponse('yes');
    }

    const pickNo = () => {
        setModalVisible(false);
        userResponse('no');
    }

    return (<View>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>OD POCZĄTKU?</Text>
                    <TouchableOpacity onPress={() => pickYes()}>
                        <Field text={'TAK'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pickNo()}>
                        <Field text={'NIE'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </View>)
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,

    },
    modalView: {
        margin: 20,
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: 'black',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    backgroundVideo: {
        height: 300,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
    },
    video: {
        width: 300,
        height: 300
    }
});

export default FromBeginningModal;