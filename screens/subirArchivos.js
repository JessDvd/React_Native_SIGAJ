import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SubirArchivoScreen() {
  const [file, setFile] = useState(null);

  const seleccionarArchivo = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    const archivo = result.assets[0];
    setFile(archivo);
  };

  const subirArchivo = async () => {
    if (!file) {
      return Alert.alert("Seleccione un archivo primero");
    }

    const userData = JSON.parse(await AsyncStorage.getItem("userData"));
    if (!userData?.id) {
      return Alert.alert("Error", "Usuario no encontrado");
    }

    const formData = new FormData();
    formData.append("archivo", {
      uri: file.uri,
      type: file.mimeType,
      name: file.name,
    });

    formData.append("id_usuario", userData.id);

    try {
      const response = await fetch("http://192.168.1.65:3000/api/subirArchivo", { //Cambiar
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const respuesta = await response.text();
      console.log("Respuesta del servidor:", respuesta);

      Alert.alert("Éxito", "Archivo subido correctamente");
      setFile(null);
    } catch (error) {
      console.error("ERROR SUBIDA:", error);
      Alert.alert("Error", "No se pudo subir el archivo");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subir Archivo</Text>

      <TouchableOpacity style={styles.button} onPress={seleccionarArchivo}>
        <Text style={styles.buttonText}>Seleccionar Archivo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.upload]}
        onPress={subirArchivo}
      >
        <Text style={styles.buttonText}>Subir Archivo</Text>
      </TouchableOpacity>

      {file && <Text style={styles.fileName}>Archivo: {file.name}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  upload: { backgroundColor: "green" },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 18 },
  fileName: { fontSize: 16, textAlign: "center" },
});
