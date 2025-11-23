import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Styles from "../styles/consulta.style";

export default function AdjuntarArchivos() {
  const [archivo, setArchivo] = useState(null);

  const seleccionarArchivo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (result.type === "success") {
        setArchivo(result);
        console.log(result);
      }
    } catch (err) {
      console.log("Error al seleccionar archivo:", err);
    }
  };

  return (
    <View style={Styles.container_inputs}>
      <TouchableOpacity style={Styles.container_textInput} onPress={seleccionarArchivo}>
        <Text style={Styles.container_textInput}>Seleccione archivos a enviar</Text>
      </TouchableOpacity>

      {archivo && (
        <Text style={{ marginTop: 10 }}>
          Archivo seleccionado: {archivo.name}
        </Text>
      )}
    </View>
  );
}
