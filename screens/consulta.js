import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Styles from "../styles/consulta.style";
import Header_User from "../components/Header_Users";
import Options from "../components/options";
import TablaArchivos from "../components/tabla_archivos";
import Input from "../components/input_busqueda";

export default function Consulta() {
  const [rol, setRol] = useState("consulta");
  const [userData, setUserData] = useState(null);
  const [search, setSearch] = useState("");
  const [ordenSeleccionado, setOrdenSeleccionado] = useState("Orden alfabeto (a-z)");
  const [tiempoSeleccionado, setTiempoSeleccionado] = useState("Más recientes");

  const [archivos, setArchivos] = useState([
    { id: "001", nombre: "Reporte_juicio", usuario: "Juan Perez", fecha: "2025-11-01" },
    { id: "002", nombre: "Fecha_Juicio", usuario: "Pedro Rodriguez", fecha: "2025-11-02" },
    { id: "003", nombre: "Citatorio", usuario: "Roberto Diaz", fecha: "2025-11-03" },
    { id: "004", nombre: "Informe_final", usuario: "Maria Lopez", fecha: "2025-11-04" },
  ]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await AsyncStorage.getItem("userData");
        if (data) {
          const parsed = JSON.parse(data);
          setUserData(parsed);
          setRol(parsed.rol);
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
      filtered = filtered.filter(
        (item) =>
          item.id.toLowerCase().includes(query) ||
          item.nombre.toLowerCase().includes(query) ||
          item.usuario.toLowerCase().includes(query)
      );
    }

    filtered.sort((a, b) => {
      if (ordenSeleccionado === "Orden alfabeto (a-z)") {
        return a.nombre.localeCompare(b.nombre);
      } else {
        return b.nombre.localeCompare(a.nombre);
      }
    });

    const hoy = new Date();
    switch (tiempoSeleccionado) {
      case "Últimas 24 horas":
        filtered = filtered.filter(
          (item) => new Date(item.fecha) >= new Date(hoy.getTime() - 24 * 60 * 60 * 1000)
        );
        break;
      case "Última semana":
        filtered = filtered.filter(
          (item) => new Date(item.fecha) >= new Date(hoy.getTime() - 7 * 24 * 60 * 60 * 1000)
        );
        break;
      case "Último mes":
        filtered = filtered.filter(
          (item) => new Date(item.fecha) >= new Date(hoy.getTime() - 30 * 24 * 60 * 60 * 1000)
        );
        break;
      default:
        break;
    }

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
          title="Buscar por ID, nombre o usuario"
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

      <View style={Styles.container_button_principal}>
        {rol === "administrador" && (
          <TouchableOpacity style={Styles.container_button}>
            <Text style={Styles.button}>Administrar</Text>
          </TouchableOpacity>
        )}
        {rol === "editor" && (
          <TouchableOpacity style={Styles.container_button}>
            <Text style={Styles.button}>Subir Archivos</Text>
          </TouchableOpacity>
        )}
        {rol === "consulta" && (
          <TouchableOpacity style={Styles.container_button}>
            <Text style={Styles.button}>Consultar</Text>
          </TouchableOpacity>
        )}
      </View>

      <TablaArchivos data={filtrarArchivos()} />
    </View>
  );
}
