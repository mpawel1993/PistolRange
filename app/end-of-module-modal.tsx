import {useEffect, useState} from "react";
import {Pressable, View, Modal, Image, Text, Alert, StyleSheet, TouchableOpacity} from "react-native";
import NavigationField from "./navigation-field";
import Field from "./field";
import {LinearGradient} from "expo-linear-gradient";

const EndOfModuleModal = ({isModalVisible}) => {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(isModalVisible);
    }, [isModalVisible]);

    const closeModal = () => {
        return setModalVisible(false);
    }

    return (
        <View>
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
                        <Text style={styles.modalText}>BRAWO UKOŃCZYŁEŚ MODUŁ</Text>
                        <Image style={styles.video}
                               source={require('../assets/passed.gif')}
                        />
                        <TouchableOpacity onPress={() => closeModal()}>
                            <View style={{width: 300, height: 10}}/>
                            <LinearGradient
                                style={{width: 300, height: 50, alignItems: 'center', justifyContent: 'center'}}
                                colors={['#94c02b', '#71912a']}>
                                <Text style={{fontSize:20 , color:'#2b2a29'}}>ZAMKNIJ</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );

}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor:'black'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'black',
        borderWidth:1,
        borderColor:'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color:'white',
        fontWeight:'bold',
        fontSize:19
    },
    video: {
        width: 300,
        height: 300
    }
});

export default EndOfModuleModal;