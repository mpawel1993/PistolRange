import {Alert, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";

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
                        <LinearGradient style={styles.gradient}
                                        colors={['#94c02b', '#71912a']}>
                            <Text style={styles.text}>TAK</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={{height:10}}/>
                    <TouchableOpacity onPress={() => pickNo()}>
                        <LinearGradient style={styles.gradient}
                                        colors={['#94c02b', '#71912a']}>
                            <Text style={styles.text}>NIE</Text>
                        </LinearGradient>
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
        justifyContent:'center',
        width:340,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontFamily:'Bahnschrift',
    },
    video: {
        width: 300,
        height: 300
    },
    gradient: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#94c02b',
        width: 300,
        paddingTop: 20,
        paddingBottom: 20,
        fontWeight: 'bold'
    }, text: {
        fontFamily:'Bahnschrift',
        fontSize: 20,
        color: '#2b2a29'
    }
});

export default FromBeginningModal;