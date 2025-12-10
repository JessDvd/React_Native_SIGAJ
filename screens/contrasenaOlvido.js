import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Input from "../components/inputs";
import styles from "../styles/contrasenaOlvido/olvido";

export default function OlvidarContrasena() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleEnviar = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Por favor ingresa tu correo electrónico.");
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.1.66:3000/api/contrasenaOlvido", //Cambiar
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          "Error",
          data.message || "No se pudo procesar la solicitud."
        );
        return;
      }

      Alert.alert(
        "Solicitud enviada",
        "Tu solicitud de restablecimiento de contraseña ha sido enviada al administrador. Serás notificado cuando se actualice."
      );

      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Hubo un problema al enviar la solicitud.");
    }
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
        <View style={styles.container}>
          <Text style={styles.logo}>Recuperar Contraseña</Text>

          <Text style={styles.text}>
            Ingresa tu correo electrónico y enviaremos una solicitud al
            administrador para que restablezca tu contraseña.
          </Text>

          <View style={styles.container_for}>
            <Input
              title="Correo electrónico"
              value={email}
              onChangeText={(text) => setEmail(text.trim())}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.container_button_group}>
            <TouchableOpacity
              style={[styles.container_button, styles.buttonEnviar]}
              onPress={handleEnviar}
            >
              <MaterialIcons name="send" size={20} color="#fff" />
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.container_button, styles.buttonBorrar]}
              onPress={() => navigation.navigate("Login")}
            >
              <MaterialIcons name="arrow-back" size={20} color="#fff" />
              <Text style={styles.buttonText}>Volver al login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}