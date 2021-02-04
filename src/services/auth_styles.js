import { StyleSheet } from "react-native";



const styles = StyleSheet.create({

    input: {
        borderRadius: 20,
        width: '90%',
        alignSelf: 'center',
        maxHeight: 40,
        margin: 4,
        fontSize: 14,
        borderWidth: 0.5,
    },
    error: {
        color: 'red',
        fontWeight: '500',
        fontStyle: 'italic',
        marginLeft: '7%'
    },
    button: {
        padding: 10,
        minHeight: 45,
        minWidth: 80,
        elevation: 1,
        borderRadius: 15,
        marginBottom: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    actionsContainer:{
        alignItems:'center'
    },  
    loginText:{
        fontWeight:'bold',
        textAlign:'center'
    },  
    extraText:{
        textAlign:'center',
        alignItems:'center',
        flexDirection:'row'
    },  
    loginTextContainer:{
    },  
    buttonText: {
        fontWeight: 'bold'
    }

});

export default styles