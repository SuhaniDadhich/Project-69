import * as React from 'react';
import { render } from 'react-dom';
import { Text, View, StyleSheet,Image,TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
var cameraImg;

function preload(){
    cameraImg = loadImage("camera.jpg");
}

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermissions:null,
            scanned: false,
            scannedData:'',
            buttonState: 'normal'
        }
    }

getCameraPermissions=async()=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
        hasCameraPermissions:status==='granted',
        buttonState:'clicked',
        scanned:false 
    })
}

handleBarCodeScanned=async({type,data})=>{
    this.setState({
        scanned:true,
        scannedData:data,
        buttonState:'normal'
    })
}

    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        if(buttonState==="clicked"&&hasCameraPermissions){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}/>
            )
        }
        else if(buttonState==='normal'){
        return(
            <View style={styles.container}> 
                <Text style={styles.displayText}>
                    {hasCameraPermissions===true?
                    this.state.scannedData
                            :
                    "Request Camera Permission." }</Text>
            <TouchableOpacity style={styles.scanButton}
            onPress={this.getCameraPermissions}
            >
             
            <Image
                style={styles.imageIcon}
                source={require('../assets/camera.jpg')}
            />

                <Text style={styles.buttonText}>
                    Scan QR Code
                </Text>
            </TouchableOpacity>
            </View>
        )
    }
  }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    displayText:{
        fontSize:15,
        
    },
    scanButton:{
        backgroundColor:'#2169f3',
        padding:11,
        margin:12
    },
    buttonText:{
        fontSize:25
    },
    imageIcon: {
        width: '100%',
        height: 350,
    }
})