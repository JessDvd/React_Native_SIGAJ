// import { useState } from "react";
// import { View, Text, TouchableOpacity, ScrollView } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import Styles from "../styles/consulta.style";
// import ModalCompartir from "./acciones/compartir";

// import * as WebBrowser from "expo-web-browser";
// import * as Sharing from "expo-sharing";

// export default function TablaArchivos({ data = [] }) {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);

//   // -------------------------
//   // ABRIR ARCHIVO (Descargar/Ver)
//   // -------------------------
//   const abrirArchivo = async (url) => {
//     try {
//       await WebBrowser.openBrowserAsync(url);
//     } catch (e) {
//       console.log("Error al abrir archivo:", e);
//     }
//   };

//   // -------------------------
//   // COMPARTIR ARCHIVO
//   // -------------------------
//   const handleShare = async () => {
//     if (!archivoSeleccionado) return;

//     try {
//       const url = archivoSeleccionado.url;

//       if (!(await Sharing.isAvailableAsync())) {
//         alert("Compartir no está disponible en este dispositivo");
//         return;
//       }

//       await Sharing.shareAsync(url);
//       setModalVisible(false);
//     } catch (e) {
//       console.log("Error al compartir:", e);
//     }
//   };

//   const archivos = Array.isArray(data) ? data : [];

//   return (
//     <View style={Styles.container_tabla}>
//       <View style={Styles.header_tabla}>
//         <Text style={[Styles.tabla_header_text, { flex: 1 }]}>Fecha</Text>
//         <Text style={[Styles.tabla_header_text, { flex: 2 }]}>
//           Nombre Archivo
//         </Text>
//         <Text style={[Styles.tabla_header_text, { flex: 2 }]}>
//           Nombre Usuario
//         </Text>
//         <Text style={[Styles.tabla_header_text, { flex: 1 }]}>Acciones</Text>
//       </View>

//       <ScrollView style={Styles.body_tabla}>
//         {archivos.length === 0 ? (
//           <View style={Styles.fila_tabla}>
//             <Text style={[Styles.text_tabla, { flex: 5, textAlign: "center" }]}>
//               No hay archivos
//             </Text>
//           </View>
//         ) : (
//           archivos.map((item, index) => (
//             <View key={index} style={Styles.fila_tabla}>
//               <Text style={[Styles.text_tabla, { flex: 1 }]}>
//                 {item.fecha ? new Date(item.fecha).toLocaleDateString() : ""}
//               </Text>
//               <Text style={[Styles.text_tabla, { flex: 2 }]}>
//                 {item.nombre || ""}
//               </Text>
//               <Text style={[Styles.text_tabla, { flex: 2 }]}>
//                 {item.usuario || ""}
//               </Text>

//               <View style={[Styles.acciones_tabla, { flex: 1 }]}>
//                 {/* COMPARTIR */}
//                 <TouchableOpacity
//                   onPress={() => {
//                     setArchivoSeleccionado(item);
//                     setModalVisible(true);
//                   }}
//                 >
//                   <MaterialIcons name="share" size={22} color="#27646B" />
//                 </TouchableOpacity>

//                 {/* DESCARGAR/ABRIR */}
//                 <TouchableOpacity onPress={() => abrirArchivo(item.url)}>
//                   <MaterialIcons
//                     name="file-download"
//                     size={22}
//                     color="#27646B"
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))
//         )}
//       </ScrollView>

//       {/* MODAL PARA COMPARTIR */}
//       <ModalCompartir
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         onShare={handleShare}
//       />
//     </View>
//   );
// }

import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Share, Linking } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Styles from "../styles/consulta.style";

export default function TablaArchivos({ data = [] }) {
  const archivos = Array.isArray(data) ? data : [];

  // Abrir archivo (descargar/visualizar)
  const abrirArchivo = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log("Error al abrir archivo:", error);
    }
  };

  // Compartir archivo (enviar link)
  const compartirArchivo = async (url) => {
    try {
      await Share.share({
        message: `Te comparto este archivo:\n${url}`,
        url: url,
      });
    } catch (error) {
      console.log("Error al compartir:", error);
    }
  };

  return (
    <View style={Styles.container_tabla}>
      <View style={Styles.header_tabla}>
        <Text style={[Styles.tabla_header_text, { flex: 1 }]}>Fecha</Text>
        <Text style={[Styles.tabla_header_text, { flex: 2 }]}>Archivo</Text>
        <Text style={[Styles.tabla_header_text, { flex: 2 }]}>Usuario</Text>
        <Text style={[Styles.tabla_header_text, { flex: 1 }]}>Acciones</Text>
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
                {item.nombre}
              </Text>

              <Text style={[Styles.text_tabla, { flex: 2 }]}>
                {item.usuario}
              </Text>

              <View style={[Styles.acciones_tabla, { flex: 1, flexDirection: "row", gap: 10 }]}>
                
                {/* Compartir */}
                <TouchableOpacity onPress={() => compartirArchivo(item.url)}>
                  <MaterialIcons name="share" size={22} color="#27646B" />
                </TouchableOpacity>

                {/* Descargar / Abrir */}
                <TouchableOpacity onPress={() => abrirArchivo(item.url)}>
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
