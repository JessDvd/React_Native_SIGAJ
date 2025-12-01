import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons } from "@expo/vector-icons";
import Styles from "../styles/consulta.style";

export default function TablaArchivos({ data = [] }) {
  const archivos = Array.isArray(data) ? data : [];

  const descargarArchivo = async (url, nombreArchivo) => {
    try {
      // Pedir permisos
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se puede guardar el archivo sin permisos');
        return;
      }

      // Ruta temporal
      const rutaTemporal = FileSystem.documentDirectory + nombreArchivo;

      // Descargar archivo desde servidor
      const { uri } = await FileSystem.downloadAsync(url, rutaTemporal);

      // Guardar en galería/descargas
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Descargas', asset, false);

      Alert.alert('Descarga completa', `Archivo guardado como: ${nombreArchivo}`);
      console.log('Archivo guardado en:', uri);
    } catch (error) {
      console.log('Error al descargar archivo:', error);
      Alert.alert('Error', 'No se pudo descargar el archivo');
    }
  };

  return (
    <View style={Styles.container_tabla}>
      <View style={Styles.header_tabla}>
        <Text style={[Styles.tabla_header_text, { flex: 1 }]}>Fecha</Text>
        <Text style={[Styles.tabla_header_text, { flex: 2 }]}>Archivo</Text>
        <Text style={[Styles.tabla_header_text, { flex: 2 }]}>Usuario</Text>
        <Text style={[Styles.tabla_header_text, { flex: 1 }]}>Descarga</Text>
      </View>

      <ScrollView style={Styles.body_tabla}>
        {archivos.length === 0 ? (
          <View style={Styles.fila_tabla}>
            <Text style={[Styles.text_tabla, { flex: 5, textAlign: "center" }]}>
              No hay archivos
            </Text>
          </View>
        ) : (
          archivos.map((item, index) => (
            <View key={index} style={Styles.fila_tabla}>
              <Text style={[Styles.text_tabla, { flex: 1 }]}>
                {item.fecha ? new Date(item.fecha).toLocaleDateString() : ""}
              </Text>

              <Text style={[Styles.text_tabla, { flex: 2 }]}>
                {item.nombre || ""}
              </Text>

              <Text style={[Styles.text_tabla, { flex: 2 }]}>
                {item.usuario || ""}
              </Text>

              <View style={[Styles.acciones_tabla, { flex: 1, flexDirection: "row", gap: 10 }]}>
                <TouchableOpacity
                  onPress={() => descargarArchivo(`http://192.168.1.65:3000${item.url}`, item.nombre)}
                >
                  <MaterialIcons name="file-download" size={22} color="#27646B" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
