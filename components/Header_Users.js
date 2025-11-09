import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import { MaterialIcons, FontAwesome5, Entypo } from "@expo/vector-icons";
import Styles from "../styles/consulta.style";

export default function Header_User({
  nombre = "",
  apellidoP = "",
  aviso = "",
}) {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={Styles.container_header}>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <MaterialIcons name="menu" size={30} color="#fff" style={Styles.menu} />
      </TouchableOpacity>

      <Text style={Styles.header} numberOfLines={1} ellipsizeMode="tail">
        {aviso}, {nombre} {apellidoP}
      </Text>

      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={Styles.overlay} onPress={() => setMenuVisible(false)}>
          <View style={Styles.menuContainer}>
            <TouchableOpacity
              style={Styles.menuItem}
              onPress={() => navigation.navigate("Mensajeria")}
            >
              <MaterialIcons name="message" size={22} color="#27646B" />
              <Text style={Styles.menuText}>Mensajería</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={Styles.menuItem}
              onPress={() => navigation.navigate("ListaMensajes")}
            >
              <FontAwesome5 name="list" size={20} color="#27646B" />
              <Text style={Styles.menuText}>Lista de mensajes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={Styles.menuItem}
              onPress={() => navigation.navigate("Consulta")}
            >
              <MaterialIcons name="folder" size={22} color="#27646B" />
              <Text style={Styles.menuText}>Consultar archivos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={Styles.menuItem}
              onPress={() => navigation.navigate("Contacto")}
            >
              <Entypo name="phone" size={22} color="#27646B" />
              <Text style={Styles.menuText}>Contactar administrador</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={Styles.menuItem}
              onPress={() => navigation.navigate("CambiarContrasena")}
            >
              <MaterialIcons name="lock" size={22} color="#27646B" />
              <Text style={Styles.menuText}>Cambiar contraseña</Text>
            </TouchableOpacity>

            <View style={Styles.divider} />

            <TouchableOpacity style={Styles.menuItem}>
              <Text style={[Styles.menuText, { color: "red" }]}>
                Cerrar sesión
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
