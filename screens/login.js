import React, { useState } from "react";

import { Text, View, Alert, TouchableOpacity } from "react-native";

import Headers from "../components/header";

import styles from "../styles/screen_style";

import Input from "../components/inputs";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFinish = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Campos incompletos", "Por favor llena todos los campos solicitados.");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.65:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "Credenciales inválidas");
        return;
      }

      if (!data.user || !data.user.rol) {
        Alert.alert("Error", "El servidor no devolvió un rol válido.");
        console.log("Respuesta:", data);
        return;
      }

      Alert.alert("Éxito", data.message);

      if (data.user.rol === "consulta") {
        navigation.navigate("Consulta");
      } else if (data.user.rol === "editor") {
        navigation.navigate("Administrador");
      } else {
        Alert.alert("Rol desconocido", data.user.rol);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contenedor}>
        <Headers titulo="Inicio de Sesión" />

        <Input
          value={username}
          onChangeText={setUsername}
          title="Nombre de Usuario"
        />

        <Input
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          title="Contraseña"
        />
        <View style={styles.contenedor_contrasena}>
          <Text
            style={styles.texto_olvido}
            onPress={() => Alert.alert("Olvidaste tu contrasena.")}
          >
            ¿Olvidaste tu contraseña?
          </Text>
        </View>

        <TouchableOpacity style={styles.boton_ingresar} onPress={handleFinish}>
          <Text style={styles.texto_boton}>Ingresar</Text>
        </TouchableOpacity>

        <View style={styles.nuevo_usuario}>
          <Text>¿Usuario Nuevo?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.boton_registrarse}> Registrate aqui!</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text onPress={() => navigation.navigate("Consulta")}>
            Pulsa Aqui para consulta
          </Text>
        </View>
      </View>
    </View>
  );
}
