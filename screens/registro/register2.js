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

  const validarCURP = (curp) => {
    const regexCURP = /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM]{1}[A-Z]{2}[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}\d{1}$/;

    if (!regexCURP.test(curp)) return false;

    const diccionario = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    const curpSinDV = curp.slice(0, -1);
    const dv = curp.slice(-1);
    let suma = 0;

    for (let i = 0; i < curpSinDV.length; i++) {
      suma += diccionario.indexOf(curpSinDV[i]) * (18 - i);
    }

    const residuo = suma % 10;
    const digitoEsperado = residuo === 0 ? "0" : (10 - residuo).toString();

    return dv === digitoEsperado;
  };

  const handleFinish = async () => {
    console.log("Departamento seleccionado:", dep);
    if (!curp.trim() || !rfc.trim() || !num.trim() || !dep.trim()) {
      Alert.alert("Campos incompletos", "Por favor llena todos los campos.");
      return;
    }

    const curpMayus = curp.toUpperCase();

    if (!validarCURP(curpMayus)) {
      Alert.alert("CURP inválida", "La CURP ingresada no es válida.");
      return;
    }

    navigation.navigate("Register3", {
      ...route.params,
      curp: curpMayus,
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

            <Input
              value={curp}
              onChangeText={(t) => setCurp(t.toUpperCase())}
              title="CURP"
            />

            <Input value={rfc} onChangeText={setRfc} title="RFC" />

            <Input
              value={num}
              onChangeText={(text) => setNum(text.replace(/[^0-9]/g, ""))}
              keyboardType="numeric"
              title="Número de Teléfono"
            />

            <InputConsulta
              title="Departamento"
              options={[
                "Violencia familiar",
                "Ventanilla",
                "Encargados de sala",
                "Modulos",
                "Coordinador de sala",
                "Encargado de audiencias",
                "Adolescentes",
                "Sistemas",
                "Juez",
              ]}
              onSelect={(value) => setDep(value)}
            />

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

//DICE051223HBCZBDA4 EJEMPLO
