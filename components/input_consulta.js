import { useState } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles/login_style";

export default function InputConsulta({ title, options = [], onSelect }) {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <View style={styles.contenedor_inputs}>
      <Picker
        selectedValue={selectedValue}
        style={[styles.input]} style={{fontSize:18}}
        onValueChange={(value) => {
          setSelectedValue(value);
          if (onSelect) onSelect(value);
        }}
      >
        <Picker.Item label="Seleccione una opción" value="" />
        {options.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );
}
