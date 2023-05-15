import {Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import NavigationField from "./navigation-field";
import {useEffect, useState} from "react";

const ExamSummary = ({isModalVisible , finalInfo, navigation}) => {

    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        setModalVisible(isModalVisible);
    },[isModalVisible]);


    const closeModal = () => {
        setModalVisible(false);
        navigation.navigate('ActivityPage');
    }

    return ( <View>
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
                    <Text style={styles.modalText}>Ukończono egzamin</Text>
                    <Image style={styles.video}
                           source={require('../assets/tmp.png')}
                    />
                    <Text style={styles.modalText}>{finalInfo}</Text>
                    <TouchableOpacity onPress={() => closeModal()}>
                        <NavigationField text={'Zamknij'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        {/*<Pressable*/}
        {/*    style={[styles.button, styles.buttonOpen]}*/}
        {/*    onPress={() => setModalVisible(true)}>*/}
        {/*    <Text style={styles.textStyle}>Show Modal</Text>*/}
        {/*</Pressable>*/}
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
        backgroundColor: 'white',
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
    video:{
        width:300,
        height:300
    }
});

export default ExamSummary;