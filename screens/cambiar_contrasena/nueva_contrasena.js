import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import { useState } from "react";
import Header from "../../components/Header_Users";
import Styles from "../../styles/consulta.style";
import Input from "../../components/inputs";
import Styles_contrasena from "../../styles/nuevaContrasena/style";

export default function CambiarContrasena() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleFinalizar = () => {
    if (password !== confirm) {
      alert("Las contraseñas no coinciden");
      return;
    }

    console.log("Contraseña cambiada");
    setModalVisible(true);
  };

  return (
    <View style={Styles.container}>
      <Header aviso="SIGAJ" nombre="Cambiar contraseña" />
      <ScrollView contentContainerStyle={Styles_contrasena.scrollContainer}>
        <View style={Styles_contrasena.card}>
          <Text style={Styles_contrasena.title}>Cambiar Contraseña</Text>

          <Text style={Styles_contrasena.subtitle}>
            Por favor, ingrese su nombre de usuario, contraseña antiguo y la
            nueva con cuidado!{" "}
          </Text>

          <Input
            title="Nombre de usuario"
            value={username}
            onChangeText={setUsername}
          />

          <Input
            title="Nueva contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <Input
            title="Confirmar contraseña"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry={true}
          />

          <TouchableOpacity
            style={Styles_contrasena.button}
            onPress={handleFinalizar}
          >
            <Text style={Styles_contrasena.buttonText}>Finalizar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={Styles_contrasena.overlay}>
          <View style={Styles_contrasena.modalContainer}>
            <Text style={Styles_contrasena.modalTitle}>
              ¡Contraseña cambiada!
            </Text>
            <Text style={Styles_contrasena.modalText}>
              Tu contraseña ha sido actualizada correctamente.
            </Text>

            <TouchableOpacity
              style={Styles_contrasena.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={Styles_contrasena.modalButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
