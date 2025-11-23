import { useState } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles/login_style";

export default function Input({ options = [] }) {
  const [selectedValue, setSelectedValue] = useState(options[0] || "");

  return (
    <View style={styles.contenedor_inputs}>
      <Picker
        style={[styles.input]}
        style={{fontSize:18}}

        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        {options.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );
}

