import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

import Headers from "../../components/header";
import styles from "../../styles/login_style";
import Input from "../../components/inputs";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [paterno, setPaterno] = useState("");
  const [materno, setMaterno] = useState("");
  const [email, setEmail] = useState("");
  const validarCorreo = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  const handleFinish = () => {
    if (
      !username.trim() ||
      !paterno.trim() ||
      !materno.trim() ||
      !email.trim()
    ) {
      Alert.alert("SIGAJ", "Campos incompletos. Por favor llena todos los campos.");
      return;
    }

    if (!validarCorreo(email.trim())) {
      Alert.alert(
        "Correo inválido",
        "Por favor ingresa un correo electrónico válido."
      );
      return;
    }

    navigation.navigate("Register2", {
      nombre: username,
      paterno,
      materno,
      email,
    });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#ffffffc7" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contenedor}>
            <Headers titulo="Registrar Usuario" />

            <Input
              value={username}
              onChangeText={setUsername}
              title="Nombre Completo"
            />
            <Input
              value={paterno}
              onChangeText={setPaterno}
              title="Apellido Paterno"
            />
            <Input
              value={materno}
              onChangeText={setMaterno}
              title="Apellido Materno"
            />
            <Input
              value={email}
              onChangeText={setEmail}
              title="Correo Electrónico (oficial)"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.boton_ingresar}
              onPress={handleFinish}
            >
              <Text style={styles.texto_boton}>Siguiente</Text>
            </TouchableOpacity>

            <View style={styles.nuevo_usuario}>
              <Text>¿Ya tienes cuenta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.boton_registrarse}> Ingresa aquí!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
