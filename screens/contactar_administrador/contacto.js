import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Styles from "../../styles/consulta.style";
import Styles_administrador from "../../styles/administrador";

import Header from "../../components/Header_Users";
import InputDescripcion from "../../components/input_descripcion";
import Input from "../../components/input_text";
import AdjuntarArchivos from "../../components/adjuntar_Archivos";

export default function Consulta() {
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [archivo, setArchivo] = useState("");

  const handleBorrar = () => {
    console.log("Borrar mensaje");
    setAsunto("");
    setDescripcion("");
    setArchivo("");
  };

  const handleEnviar = () => {
    console.log("Mensaje enviado");
  };

  return (
    <View style={Styles.container}>
      <Header aviso="SIGAJ" nombre="Contacto con administrador" />

      <ImageBackground
        source={require("../../assets/img/logo.png")}
        style={Styles_administrador.background}
        resizeMode="contain"
        blurRadius={1.5}
      >
        <ScrollView contentContainerStyle={Styles_administrador.contenido}>
          <View style={Styles_administrador.contenido_contacto}>
            <View style={Styles_administrador.header}>
              <Text style={Styles_administrador.headerTitle}>
                Contacto con administrador
              </Text>
            </View>

            <Text style={Styles_administrador.descripcion}>
              “Envía un mensaje al administrador del sistema para resolver dudas
              o reportar un problema.”
            </Text>
            
            <View style={Styles.container_for}>
              <Input title="Nombre de usuario:" value={asunto} onChangeText={setAsunto} />
            </View>

            <View style={Styles.container_for}>
              <Input title="Correo electronico:" value={asunto} onChangeText={setAsunto} />
            </View>

            <View style={Styles.container_for}>
              <Input title="Asunto:" value={asunto} onChangeText={setAsunto} />
            </View>

            <View style={Styles.container_busqueda}>
              <InputDescripcion
                multiline={true}
                title="Descripción:"
                value={descripcion}
                onChangeText={setDescripcion}
              />
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
      </ImageBackground>
    </View>
  );
}
