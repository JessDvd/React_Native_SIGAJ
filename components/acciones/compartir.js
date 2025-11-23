import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import Styles from "../../styles/compartir/style";
import Input from "../../components/input_busqueda";

export default function ModalCompartir({ visible, onClose }) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={Styles.overlay}>
        <View style={Styles.modalContainer}>
          <ImageBackground
            source={require("../../assets/img/logo.png")}
            style={Styles.backgroundImage}
            imageStyle={{ opacity: 0.08, resizeMode: "contain" }}
          >
            <ScrollView contentContainerStyle={Styles.scrollContent}>
              <Text style={Styles.title}>Compartir “Nombre de Proyecto”</Text>

              <Input title="Añadir nombre de usuario" />

              <View style={Styles.section}>
                <Text style={Styles.sectionTitle}>Personas con acceso</Text>

                <View style={Styles.accessBox}>
                  <View style={Styles.userList}>
                    <Text style={Styles.user}>Usuario 1</Text>
                    <Text style={Styles.user}>Usuario 2</Text>
                  </View>
                </View>
              </View>

              <View style={Styles.section}>
                <Text style={Styles.sectionTitle}>Compartir archivos</Text>

                <View style={Styles.fileOptions}>
                  <View style={Styles.fileColumn}>
                    <TouchableOpacity style={Styles.pdfButton}>
                      <Text style={Styles.buttonText}>PDF</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={Styles.fileColumn}>
                    <TouchableOpacity style={Styles.docxButton}>
                      <Text style={Styles.buttonText}>DOCX</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={Styles.closeButton} onPress={onClose}>
                <Text style={Styles.closeText}>Cerrar</Text>
              </TouchableOpacity>
            </ScrollView>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
}
