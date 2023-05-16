import {StyleSheet, Text, View} from "react-native";

const ExamTime = () => {
    return (<View>
        <OneTime></OneTime>
    </View>)
}

const OneTime = () => {
    return (<View style={styles.super}>
        <View style={styles.container}>
            <View style={styles.oneModule}></View>
            <View style={styles.oneModule}></View>
            <View style={styles.oneModule}></View>
            <View style={styles.oneModule}></View>
            <View style={styles.oneModule}></View>
            <View style={styles.oneModule}></View>
            <View style={styles.oneModule}></View>
            <View style={styles.oneModule}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
            <View style={styles.border}></View>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    container:{
        width:300,
        height:20,
        borderColor:'#94c02b',
        borderWidth: 2,
        flexDirection:'row',
        backgroundColor:'white',
        borderRadius:1
    },oneModule:{
        backgroundColor:'#94c02b',
        width:10
    },border:{
        width:6,
        backgroundColor:'white',
        borderColor:'#94c02b',
        borderWidth: 1,
        borderTopColor: 'white',
        borderBottomColor:'white',
        borderLeftColor:'white',
    }
});

export default ExamTime