import { View, Image, TextInput } from "react-native";
import Styles from "../styles/consulta.style";

export default function Input_Busqueda({ title = "", value, onChangeText }) {
  return (
    <View style={Styles.container_inputs}>
      <Image
        source={require("../assets/img/lupa.png")}
        alt="Lupa de busqueda"
        style={Styles.lupa}
      />

      <TextInput
        style={Styles.container_textInput}
        placeholder={title}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
