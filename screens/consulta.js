import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Styles from "../styles/consulta.style";
import Header_User from "../components/Header_Users";
import Options from "../components/options";
import TablaArchivos from "../components/tabla_archivos";
import Input from "../components/input_busqueda";

export default function Consulta({ navigation }) {
  const [rol, setRol] = useState("consulta");
  const [userData, setUserData] = useState(null);
  const [search, setSearch] = useState("");

  const [ordenSeleccionado, setOrdenSeleccionado] = useState("Orden alfabeto (a-z)");
  const [tiempoSeleccionado, setTiempoSeleccionado] = useState("Más recientes");

  const [archivos, setArchivos] = useState([]);

  const fetchArchivos = async (idUsuario) => {
  try {
    const response = await fetch(`http://192.168.1.65:3000/api/archivos/${idUsuario}`) //Cambiar

    const text = await response.text();

    const data = JSON.parse(text);
    setArchivos(Array.isArray(data) ? data : []);
  } catch (error) {
    console.log("Error cargando archivos:", error);
  }
};

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await AsyncStorage.getItem("userData");
        if (data) {
          const parsed = JSON.parse(data);
          setUserData(parsed);
          setRol(parsed.rol);
          fetchArchivos(parsed.id);
        }
      } catch (err) {
        console.error("Error al cargar userData:", err);
      }
    };
    loadUser();
  }, []);

  const filtrarArchivos = () => {
    let filtered = [...archivos];

    if (search.trim()) {
      const query = search.toLowerCase();
      filtered = filtered.filter((item) => {
        const fechaStr = item.fecha
          ? new Date(item.fecha).toISOString().split("T")[0]
          : "";

        return (
          item.nombre?.toLowerCase().includes(query) ||
          item.usuario?.toLowerCase().includes(query) ||
          fechaStr.includes(query) ||
          item.id_archivos?.toLowerCase().includes(query)
        );
      });
    }

    const hoy = new Date();
    switch (tiempoSeleccionado) {
      case "Últimas 24 horas":
        filtered = filtered.filter(
          (item) =>
            new Date(item.fecha) >= new Date(hoy.getTime() - 24 * 60 * 60 * 1000)
        );
        break;

      case "Última semana":
        filtered = filtered.filter(
          (item) =>
            new Date(item.fecha) >= new Date(hoy.getTime() - 7 * 24 * 60 * 60 * 1000)
        );
        break;

      case "Último mes":
        filtered = filtered.filter(
          (item) =>
            new Date(item.fecha) >= new Date(hoy.getTime() - 30 * 24 * 60 * 60 * 1000)
        );
        break;
    }

    filtered.sort((a, b) => {
      if (tiempoSeleccionado === "Más recientes")
        return new Date(b.fecha) - new Date(a.fecha);

      if (tiempoSeleccionado === "Más antiguos")
        return new Date(a.fecha) - new Date(b.fecha);

      if (ordenSeleccionado === "Orden alfabeto (a-z)")
        return a.nombre?.localeCompare(b.nombre);

      return b.nombre?.localeCompare(a.nombre);
    });

    return filtered;
  };

  const opcionesTiempo = [
    "Más recientes",
    "Más antiguos",
    "Últimas 24 horas",
    "Última semana",
    "Último mes",
  ];

  const orden = ["Orden alfabeto (a-z)", "Orden alfabeto (z-a)"];

  return (
    <View style={Styles.container}>
      <Header_User aviso={`${userData?.username || ""}`} />

      <View style={Styles.container_busqueda}>
        <Input
          title="Buscar archivo"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={Styles.container_options}>
        <Options
          options={orden}
          selected={ordenSeleccionado}
          onSelect={setOrdenSeleccionado}
        />
      </View>

      <View style={Styles.container_options}>
        <Options
          options={opcionesTiempo}
          selected={tiempoSeleccionado}
          onSelect={setTiempoSeleccionado}
        />
      </View>

      <View style={{ alignItems: "center", marginVertical: 10 }}>
        <TouchableOpacity
          style={Styles.container_button}
          onPress={() => fetchArchivos(userData.id)}
        >
          <Text style={Styles.button}>Recargar</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={Styles.container_button}
          onPress={() => navigation.navigate("SubirArchivos")}
        >
          <Text style={Styles.button}>Subir Archivo</Text>
        </TouchableOpacity> */}
      </View>

      <TablaArchivos data={filtrarArchivos()} />
    </View>
  );
}
