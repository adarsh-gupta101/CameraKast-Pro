import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export default function App() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasCameraPermission, setCameraPermission] = useState(null);
  const cameraRef = useRef(null);

useEffect(()=>{
  // camera permisions
  (async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(status === "granted");
  })();
},[])

  function toggleFlash() {
    console.log("flash");
    setFlash((current) =>
      current === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  }

  async function takePicture() {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync();
      console.log(photo);
      // save to device
      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      console.log(asset);

      // You can handle the taken photo here (e.g., save it or display it).
    }
  }

  function toggleCameraType() {
    setType((current) =>
      current === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === "granted");
    })();
  }, []);

  async function startCamera() {
    if (hasCameraPermission) {
      await cameraRef.current.resumePreview();
    }
  }

  const pinch = Gesture.Pinch().onStart((event) => {
    console.log("Pinch started");
    console.log(event);
  });
  console.log(pinch)

  return (
    <GestureHandlerRootView style={{flex:1}}>
      <GestureDetector gesture={pinch} >
        <View style={styles.container}>
          {hasCameraPermission ? (
            <Camera
              style={styles.camera}
              type={type}
              flashMode={Camera.Constants.FlashMode.auto}
              ref={cameraRef}
              onCameraReady={startCamera}
            ></Camera>
          ) : (
            <Text>No access to camera</Text>
          )}

          <View style={styles.buttonContainer}>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraType}
              >
                <Text style={styles.buttonText}>🐬</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={takePicture}>
                <Text style={styles.buttonText}>📷</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
    aspectRatio: 3 / 4, // Set the aspect ratio as desired (4:3)
  },
  buttonContainer: {
    flex: 0.2,
    backgroundColor: "transparent",
    position: "absolute",
    justifyContent: "flex-end", // Adjust alignment to the bottom
    bottom: 15, // Bottom position of button container
    width: "100%", // As wide as the whole screen
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20, // Adjust horizontal margin
  },
  button: {
    flex: 1,
    alignSelf: "center", // Center buttons horizontally
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 1,
    width: "fit-content",
  },
  buttonText: {
    color: "black",
    fontSize: 26,
  },
  captureButton: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 16,
    alignSelf: "center", // Center the capture button horizontally
  },
});
