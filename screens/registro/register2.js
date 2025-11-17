import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Headers from "../../components/header";
import styles from "../../styles/login_style";
import Input from "../../components/inputs";
import InputConsulta from "../../components/input_consulta";

export default function RegisterScreen({ navigation }) {
  const [curp, setCurp] = useState("");
  const [rfc, setRfc] = useState("");
  const [num, setNum] = useState("");
  const [dep, setDep] = useState("");

  const handleFinish = async () => {
    if (!curp.trim() || !rfc.trim() || !num.trim() || !dep.trim()) {
      Alert.alert("Campos incompletos", "Por favor llena todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.66:3000/api/register2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ curp, rfc, num, dep }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          "Error",
          data.message || "No se pudo registrar el usuario."
        );
        return;
      }

      Alert.alert("Éxito", data.message);
      navigation.navigate("Register3");
    } catch (error) {
      console.error("Error de conexión:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    }
  };

  return (
    <KeyboardAvoidingView
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

            <Input value={curp} onChangeText={setCurp} title="CURP" />
            <Input value={rfc} onChangeText={setRfc} title="RFC" />
            <Input
              value={num}
              onChangeText={(text) => setNum(text.replace(/[^0-9]/g, ""))}
              keyboardType="numeric"
              title="Número de Teléfono"
            />
            <Input value={dep} onChangeText={setDep} title="Departamento" />

            <InputConsulta title="Consulta" options={["Consulta"]} />

            <TouchableOpacity
              style={styles.boton_ingresar}
              onPress={handleFinish}
            >
              <Text style={styles.texto_boton}>Registrar</Text>
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
    </KeyboardAvoidingView>
  );
}
