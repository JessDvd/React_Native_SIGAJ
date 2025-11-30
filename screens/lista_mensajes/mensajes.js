import { useState } from "react";

import { View, Text, TouchableOpacity, FlatList } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Styles from "../../styles/consulta.style";

import StylesList from "../../styles/mensaje_style";

import Header from "../../components/Header_Users";

export default function Consulta() {
  const [mostrarMensajes, setMostrarMensajes] = useState(false);
  const [mensajeSeleccionado] = useState(null);
  const mensajes = [
    { id: "1", nombre: "Nombre Apellido", hora: "09:00 am" },
    { id: "2", nombre: "Nombre2 Apellido2", hora: "10:00 am" },
    { id: "3", nombre: "Nombre3 Apellido3", hora: "11:00 am" },
    { id: "4", nombre: "Nombre4 Apellido4", hora: "12:00 am" },
    { id: "5", nombre: "Nombre5 Apellido5", hora: "01:00 pm" },
  ];

  return (
    <View style={Styles.container}>
      <Header aviso="Lista de mensajes" nombre="Jesus" apellidoP="Diaz" />

      <TouchableOpacity
        style={StylesList.subHeader}
        onPress={() => setMostrarMensajes(!mostrarMensajes)}
      >
        <Ionicons
          name={mostrarMensajes ? "chevron-down" : "chevron-forward"}
          size={22}
          color="#000"
        />
        <Ionicons
          name="mail"
          size={22}
          color="#000"
          style={{ marginHorizontal: 10 }}
        />
        <Text style={StylesList.subHeaderText}>Mensajes de Usuarios</Text>
      </TouchableOpacity>

      {mostrarMensajes && (
        <FlatList
          data={mensajes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={StylesList.mensajeItem}>
              <View>
                <Text style={StylesList.nombre}>{item.nombre}</Text>
                <Text style={StylesList.subtexto}>Tiene un nuevo mensaje</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={StylesList.puntoRojo} />
                <Text style={StylesList.hora}>{item.hora}</Text>
              </View>
            </View>
          )}
        />
      )}
      {!mensajeSeleccionado && (
        <View style={StylesList.avisoContainer}>
          <Ionicons name="alert-circle-outline" size={22} color="#000" />
          <Text style={StylesList.avisoTexto}>Ningún mensaje seleccionado</Text>
        </View>
      )}
    </View>
  );
}
