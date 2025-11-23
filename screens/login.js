import React, { useState } from "react";
import { Text, View, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Headers from "../components/header";
import styles from "../styles/screen_style";
import Input from "../components/inputs";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFinish = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("SIGAJ", "Ingrese el Nombre de Usuario y Contraseña.");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.66:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message);
        return;
      }

      await AsyncStorage.setItem("userData", JSON.stringify(data.user));

      Alert.alert("Éxito", data.message);
      navigation.navigate("Consulta");
    } catch (error) {
      console.error("Error de Conexión:", error);
      Alert.alert("Error", "No se pudo conectar al servidor.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contenedor}>
        <Headers titulo="Inicio de Sesión" />

        <Input
          value={username}
          onChangeText={(text) => setUsername(text.trim())}
          title="Nombre de Usuario"
        />

        <Input
          value={password}
          onChangeText={(text) => setPassword(text.trim())}
          secureTextEntry={true}
          title="Contraseña"
        />

        <View style={styles.contenedor_contrasena}>
          <TouchableOpacity
            onPress={() => navigation.navigate("OlvidarContrasena")}
          >
            <Text style={{ marginTop: 10, textAlign: "center" }}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.boton_ingresar} onPress={handleFinish}>
          <Text style={styles.texto_boton}>Ingresar</Text>
        </TouchableOpacity>

        <View style={styles.nuevo_usuario}>
          <Text>¿Usuario Nuevo?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.boton_registrarse}> ¡Regístrate aquí!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
