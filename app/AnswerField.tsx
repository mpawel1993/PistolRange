import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

const AnswerField = ({option, possibleAnswer}) =>{

    return(<View style={styles.container}>
        {/*<LinearGradient style={styles.gradient}*/}
        {/*    // Button Linear Gradient*/}
        {/*                colors={['#94c02b', '#71912a']}>*/}
        {/*    <View style={[{flexDirection:'row', alignItems:'center'}]}>*/}
        {/*        <View style={[{flex:1,flexDirection:'row'}]}>*/}
        {/*            <Text style={styles.text}>{option}</Text>*/}
        {/*        </View>*/}
        {/*        <View style={[{justifyContent:'space-evenly', marginVertical:10}]}>*/}
        {/*            <Text style={styles.text}>{possibleAnswer}</Text>*/}
        {/*        </View>*/}
        {/*    </View>*/}
        {/*</LinearGradient>*/}

        <LinearGradient style={styles.gradient}
            // Button Linear Gradient
            //             colors={['#94c02b', '#71912a']}>
            //             colors={['#94c02b', '#71912a']}>
                        colors={['#530000', '#740000']}>
            <View style={[{flexDirection:'row', alignItems:'center'}]}>
                <View style={[{flex:1,flexDirection:'row'}]}>
                    <Text style={styles.text}>{option}</Text>
                </View>
                <View style={[{justifyContent:'space-evenly', marginVertical:10}]}>
                    <Text style={styles.text}>{possibleAnswer}</Text>
                </View>
            </View>
        </LinearGradient>
    </View>)
}

const styles = StyleSheet.create({
    container:{
        padding:3
    },
    gradient:{
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor:'#94c02b',
        borderColor:'#fefefe',
        borderRadius:10,
        height:100,
        width: 300

    },text:{
        fontSize:20,
        color:'#2b2a29'
    }
});

export default AnswerField;