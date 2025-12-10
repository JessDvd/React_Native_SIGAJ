import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Modal, Pressable, Alert } from "react-native";
import {
  MaterialIcons,
  FontAwesome5,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Styles from "../styles/consulta.style";

export default function Header_User() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const aviso = "Funcionalidad disponible en la aplicación web.";

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

  const rol = userData?.rol || "consulta";
  const nombre = userData?.username || "Invitado";

  const obtenerOpcionesMenu = () => {
    switch (rol.toLowerCase()) {
      case "administrador":
        return [
          {
            icon: <MaterialIcons name="group" size={22} color="#27646B" />,
            text: "Consultar Usuarios",
            action: () => navigation.navigate("GestionUsuarios"),
          },
          {
            icon: <MaterialIcons name="folder" size={22} color="#27646B" />,
            text: "Consultar Archivos",
            action: () => navigation.navigate("Consulta"),
          },
          {
            icon: <MaterialIcons name="message" size={22} color="#27646B" />,
            text: "Mensajería",
            action: () => navigation.navigate("Mensajeria"),
          },
        ];

      default:
        return [
          {
            icon: <MaterialIcons name="folder" size={22} color="#27646B" />,
            text: "Consultar archivos",
            action: () => navigation.navigate("Consulta"),
          },
          {
            icon: <Entypo name="phone" size={22} color="#27646B" />,
            text: "Contactar administrador",
            action: () => navigation.navigate("Contacto"),
          },
          {
            icon: <MaterialIcons name="message" size={22} color="#27646B" />,
            text: "Mensajería",
            action: () => navigation.navigate("Mensajeria"),
          },
        ];
    }
  };

  const opciones = obtenerOpcionesMenu();

  const cerrarSesion = async () => {
    await AsyncStorage.removeItem("userData");
    setMenuVisible(false);
    navigation.navigate("Login");
  };

  return (
    <View style={Styles.container_header}>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <MaterialIcons name="menu" size={30} color="#fff" style={Styles.menu} />
      </TouchableOpacity>

      <Text style={Styles.header} numberOfLines={1} ellipsizeMode="tail">
        ¡Hola! {nombre} ({rol})
      </Text>

      <Modal
        transparent
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={Styles.overlay} onPress={() => setMenuVisible(false)}>
          <View style={Styles.menuContainer}>
            {opciones.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={Styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  item.action();
                }}
              >
                {item.icon}
                <Text style={Styles.menuText}>{item.text}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={Styles.menuItem}
              onPress={() => navigation.navigate("OlvidarContrasena")}
            >
              <MaterialIcons name="lock" size={22} color="#27646B" />
              <Text style={Styles.menuText}>Cambiar contraseña</Text>
            </TouchableOpacity>

            <View style={Styles.divider} />

            <TouchableOpacity style={Styles.menuItem} onPress={cerrarSesion}>
              <Ionicons name="log-out-outline" size={22} color="red" />
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
