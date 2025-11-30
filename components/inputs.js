import { View, TextInput } from "react-native";
import styles from "../styles/login_style";

export default function Input({
  title = "",
  value,
  onChangeText,
  secureTextEntry = false,
}) {
  return (
    <View style={styles.contenedor_inputs}>
      <TextInput
        style={[styles.input, { fontSize: 18 }]}
        placeholder={title}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}
