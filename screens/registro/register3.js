import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Headers from "../../components/header";
import styles from "../../styles/login_style";
import Input from "../../components/inputs";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen({ navigation, route }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  //console.log("REGISTER 3 PARAMS:", route?.params);

  useEffect(() => {
    if (route.params) {
      generarInicial();
    }
  }, [route.params]);

  const generarInicial = async () => {
    try {
      //Cambiar la URL por la de tu servidor
      const response = await fetch(
        "http://192.168.1.65:3000/api/generar-usuario",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(route.params),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUsername(data.usuario_generado);
      } else {
        Alert.alert("Error", data.message || "No se pudo generar usuario.");
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const handleGenerateUsername = async () => {
    try {
      const response = await fetch(
        "http://192.168.1.65:3000/api/generar-usuario",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(route.params),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "No se pudo generar usuario.");
        return;
      }

      setUsername(data.usuario_generado);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    }
  };

  const handleFinish = async () => {
  if (!username.trim() || !password.trim() || !confirm.trim()) {
    Alert.alert("Campos incompletos", "Por favor llena todos los campos.");
    return;
  }

  if (password !== confirm) {
    Alert.alert("Error", "Las contraseñas no coinciden.");
    return;
  }

  const dataFinal = {
    ...route.params,
    username,
    password,
  };

  //Cambiar la URL por la de tu servidor
  try {
    const response = await fetch("http://192.168.1.65:3000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataFinal),
    });

    const data = await response.json();

    if (!response.ok) {
      Alert.alert("Error", data.message || "No se pudo registrar el usuario.");
      return;
    }

    Alert.alert("Éxito", data.message, [
      {
        text: "OK",
        onPress: () => navigation.navigate("Login", { newUser: username }),
      },
    ]);
  } catch (error) {
    console.error("Error de conexión:", error);
    Alert.alert("Error", "No se pudo conectar con el servidor.");
  }
};



  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: "#757575c7" }]}
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
              title="Nombre de Usuario"
              value={username}
              editable={false}
            />

            <Input
              title="Ingrese la Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />

            <Input
              title="Verifique la Contraseña"
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry={true}
            />

            <TouchableOpacity
              style={styles.boton_generar}
              onPress={handleGenerateUsername}
            >
              <Text style={styles.texto_boton}>Generar Usuario</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.boton_ingresar}
              onPress={handleFinish}
            >
              <Text style={styles.texto_boton}>Finalizar</Text>
            </TouchableOpacity>

            <View style={styles.nuevo_usuario}>
              <Text>¿Ya tienes cuenta?</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Login", { newUser: username })
                }
              >
                <Text style={styles.boton_registrarse}> Ingresa aquí!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
