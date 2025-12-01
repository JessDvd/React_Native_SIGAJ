import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";

export default function SubirArchivoScreen({ route }) {
  const [file, setFile] = useState(null);

  // ⬅️ AQUI RECIBIRÁS EL USUARIO LOGUEADO
  // Ejemplo: route.params?.user
  // Mientras tanto, lo dejo HARDCODEADO para que funcione:
  const userId = route?.params?.user?.id || 1; 

  const seleccionarArchivo = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      copyToCacheDirectory: true,
    });

    if (result.canceled) {
      return Alert.alert("SIGAJ", "No se seleccionó ningún archivo");
    }

    const archivo = result.assets[0];

    const tiposPermitidos = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!tiposPermitidos.includes(archivo.mimeType)) {
      return Alert.alert(
        "Archivo no permitido",
        "Solo se aceptan archivos PDF o Word (DOC, DOCX)"
      );
    }

    setFile(archivo);
  };

  const subirArchivo = async () => {
    if (!file) {
      return Alert.alert("Seleccione un archivo primero");
    }

    const data = new FormData();

    // IMPORTANTE: backend espera req.body.id
    data.append("id_usuario", String(userId));

    // Archivo
    data.append("archivo", {
      uri: file.uri,
      type: file.mimeType,
      name: file.name,
    });

    try {
      const response = await fetch("http://192.168.1.65:3000/api/subirArchivo", {
        method: "POST",
        body: data, // ❗ sin headers, fetch los pone automáticamente
      });

      const text = await response.text();
      console.log("RESPUESTA CRUDA:", text);

      Alert.alert("Éxito", "Archivo subido correctamente");
      setFile(null);
    } catch (error) {
      console.error("ERROR SUBIDA:", error);
      Alert.alert("Error", "No se pudo subir el archivo");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subir Archivos</Text>

      <TouchableOpacity style={styles.button} onPress={seleccionarArchivo}>
        <Text style={styles.buttonText}>Seleccionar Archivo</Text>
      </TouchableOpacity>

      {file && <Text style={styles.fileName}>Archivo: {file.name}</Text>}

      <TouchableOpacity
        style={[styles.button, styles.upload]}
        onPress={subirArchivo}
      >
        <Text style={styles.buttonText}>Subir Archivo</Text>
      </TouchableOpacity>
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
