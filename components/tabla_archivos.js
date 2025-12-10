import { View, Text, ScrollView } from "react-native";
import Styles from "../styles/consulta.style";

export default function TablaArchivos({ data = [] }) {
  const archivos = Array.isArray(data) ? data : [];

  return (
    <View style={Styles.container_tabla}>
      <View style={Styles.header_tabla}>
        <Text style={[Styles.tabla_header_text, { flex: 1 }]}>Fecha</Text>
        <Text style={[Styles.tabla_header_text, { flex: 2 }]}>Archivo</Text>
        <Text style={[Styles.tabla_header_text, { flex: 2 }]}>Usuario</Text>
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
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
