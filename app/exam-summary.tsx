import {Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";

const ExamSummary = ({isModalVisible, navigation, passed, good}) => {

    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        setModalVisible(isModalVisible);
    }, [isModalVisible]);


    const closeExam = () => {
        setModalVisible(false);
        navigation.navigate('ActivityPage');
    }

    const closeModal = () => {
        setModalVisible(false);
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
                    <Text style={styles.modalText}>UKOŃCZONO EGZAMIN</Text>
                    <Text style={styles.modalText}>{good == 10 ?
                        <Text style={{color:'green'}}>ZALICZONO</Text> : <Text style={{color:'red'}}>NIE ZALICZONO</Text>}</Text>
                    <Image style={styles.video}
                           source={passed ? require('../assets/passed.gif') : require('../assets/failed.gif')}
                    />
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.modalText}>DOBRZE: {good} </Text>
                        <Text style={styles.modalText}> ŹLE: {10 - good}</Text>
                    </View>
                    <View style={{height:10}}/>
                    <View style={{width: 300}}>
                        <Text style={{color: 'white'}}>LEGENDA: </Text>
                        <View style={{height: 5}}/>
                        <LinearGradient colors={['green', 'green']} style={{
                            height: 30,
                            width: 300,
                            justifyContent: "center",
                            alignItems: 'center'
                        }}>
                            <Text>PRAWIDŁOWA ODPOWIEDŹ</Text>
                        </LinearGradient>
                        <View style={{height: 5}}/>
                        <LinearGradient colors={['red', 'red']} style={{
                            height: 30,
                            width: 300,
                            justifyContent: "center",
                            alignItems: 'center'
                        }}>
                            <Text>NIEPRAWIDŁOWA ODPOWIEDŹ</Text>
                        </LinearGradient>
                        <View style={{height: 5}}/>
                        <LinearGradient colors={['grey', 'grey']} style={{
                            height: 30,
                            width: 300,
                            justifyContent: "center",
                            alignItems: 'center'
                        }}>
                            <Text>NIE ZAZNACZONA ODPOWIEDŹ</Text>
                        </LinearGradient>
                        <View style={{height: 5}}/>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.answerOption}>B</Text>
                            <Text style={{color: 'white', height: 30, width: 300, fontSize: 15, paddingTop: 10}}>
                                <Text style={{fontSize: 8}}>( podkreślenie)</Text> UDZIELONA ODPOWIEDŹ
                            </Text>
                        </View>
                        <View style={{height: 10}}/>

                    </View>
                    <TouchableOpacity onPress={() => closeModal()}>
                        <LinearGradient
                            style={{width: 300, height: 50, alignItems: 'center', justifyContent: 'center'}}
                            colors={['#94c02b', '#71912a']}>
                            <Text style={{fontSize: 20, color: '#2b2a29'}}>PRZEGLĄDAJ</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={{height: 10}}/>
                    <TouchableOpacity onPress={() => closeExam()}>
                        <LinearGradient
                            style={{width: 300, height: 50, alignItems: 'center', justifyContent: 'center'}}
                            colors={['#94c02b', '#71912a']}>
                            <Text style={{fontSize: 20, color: '#2b2a29'}}>ZAMKNIJ</Text>
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
        backgroundColor: 'black'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'black',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
    },
    modalText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
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
    },
    answerOption: {
        color: 'white',
        paddingRight: 5,
        backgroundColor: 'black',
        textDecorationLine: 'underline',
        fontSize: 30
    }
});

export default ExamSummary;