import { useState } from "react";
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
import InputConsulta from "../../components/input_consulta";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen({ navigation, route }) {
  const [curp, setCurp] = useState("");
  const [rfc, setRfc] = useState("");
  const [num, setNum] = useState("");
  const [dep, setDep] = useState("");

  const handleFinish = async () => {
    if (!curp.trim() || !rfc.trim() || !num.trim() || !dep.trim()) {
      Alert.alert("Campos incompletos", "Por favor llena todos los campos.");
      return;
    }

    navigation.navigate("Register3", {
      ...route.params,
      curp,
      rfc,
      telefono: num,
      departamento: dep,
    });
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
