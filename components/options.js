import { useState } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Styles from "../styles/consulta.style";

export default function Input({ options = [], title="Seleccione una opción" }) {
  const [selectedValue, setSelectedValue] = useState(options[0] || "");

  return (
    <View style={Styles.container_option}>
      <Picker
        style={Styles.picker}
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        dropdownIconColor={"#27646B"}
      >
        <Picker.Item
        label={title} value="" enabled={false} />

        {options.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );
}
