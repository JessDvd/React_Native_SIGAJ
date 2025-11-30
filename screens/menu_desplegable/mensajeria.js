import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import Header from "../../components/Header_Users";
import Styles from "../../styles/consulta.style";
import Input from "../../components/input_text";
import InputDescripcion from "../../components/input_descripcion";
import AdjuntarArchivos from "../../components/adjuntar_Archivos";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Mensajeria() {

  const [userData, setUserData] = useState(null);
  const nombre = userData?.username || "Invitado";

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await AsyncStorage.getItem("userData");
        if (data) setUserData(JSON.parse(data));
      } catch (err) {
        console.error("Error al cargar usuario:", err);
      }
    };
    loadUserData();
  }, []);

  const handleBorrar = () => {
    console.log("Borrar Mensaje");
  };

  const handleEnviar = () => {
    console.log("Enviar Mensaje");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={Styles.container}>
          <Header/>

          <Image
            source={require("../../assets/img/logo.png")}
            alt="Logo Poder Judicial de Baja California"
            style={Styles.logo}
          />

          <View style={Styles.container_text_mensajeria}>
            <Text style={Styles.text_mensajeria}>De: {nombre}</Text>
          </View>

          <View style={Styles.container_for}>
            <Input title="Destinatario:" />
          </View>

          <View style={Styles.container_for}>
            <Input title="Asunto:" />
          </View>

          <View style={Styles.container_busqueda}>
            <InputDescripcion multiline={true} title="Descripción: " />
          </View>

          <View style={Styles.container_for}>
            <AdjuntarArchivos />
          </View>

          <View style={Styles.container_button_group}>
            <TouchableOpacity
              style={[Styles.button_descripcion, Styles.buttonBorrar]}
              onPress={handleBorrar}
            >
              <Ionicons name="trash-outline" size={18} color="#fff" />
              <Text style={Styles.buttonText}>Borrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[Styles.button_descripcion, Styles.buttonEnviar]}
              onPress={handleEnviar}
            >
              <Ionicons name="send-outline" size={18} color="#fff" />
              <Text style={Styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
