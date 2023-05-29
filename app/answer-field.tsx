import {StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {useState} from "react";

const AnswerField = ({option, possibleAnswer, gradientColours, isPicked}) => {


    return (<View style={{flexDirection: 'row', padding: 3, alignItems: 'center'}}>
        <View>
            <Text style={isPicked ?  styles.underlinedAnswerOption  : styles.answerOption}>{option.toUpperCase()}</Text>
        </View>
        <View>
            <LinearGradient style={styles.gradient}
                            colors={gradientColours == undefined ? ['white', 'white'] : gradientColours}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 1}}>
                <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
                    <View style={[{
                        flex: 5,
                        justifyContent: 'space-evenly',
                        marginVertical: 10,
                        paddingLeft: 5,
                        paddingRight: 5
                    }]}>
                        <Text style={styles.text}>{possibleAnswer}</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        padding: 3
    },
    gradient: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        width: 340,
        color: '#2b2a29',
        minHeight:80
    }, text: {
        fontSize: 13.8,
        fontFamily:'Bahnschrift'
    }, answerOption: {
        color: 'white',
        fontSize: 40,
        paddingRight: 5,
        backgroundColor: 'black',
    },
    underlinedAnswerOption: {
        color: 'white',
        fontSize: 40,
        paddingRight: 5,
        backgroundColor: 'black',
        textDecorationLine:'underline'
    }
});

export default AnswerField;