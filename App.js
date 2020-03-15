'use strict';
import React, { PureComponent, useState, useEffect } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Permissions from 'react-native-permissions';

const CameraApp = () => {
    let [flash, setFlash] = useState('off')
    let [zoom, setZoom] = useState(0)
    let [autoFocus, setAutoFocus] = useState('on')
    let [depth, setDepth] = useState(0)
    let [type, setType] = useState('back')
    let [permission, setPermission] = useState('undetermined')
    let cameraRef = useRef(null)
    useEffect(() => {
        Permissions.check('photo').then(response => {
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        setPermission(response);
        });
    }, []);

    toggleFlash() {
        setFlash(flashModeOrder[flash])
    }
    zoomOut() {
        setZoom(zoom - 0.1 < 0 ? 0 : zoom - 0.1)
    }
    zoomIn() {    
        setZoom(zoom + 0.1 > 1 ? 1 : zoom + 0.1);
    }
    takePicture = async() => {
        if (cameraRef) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(soptions);
            console.log(data.uri);  
        }
    };
    return (
      <View style={styles.container}>
        <RNCamera
          ref={cameraRef}
          style={styles.preview}
          type={type}
          flashMode={flash}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}