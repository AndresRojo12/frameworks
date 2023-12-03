<template>
  <v-form @submit.prevent="actualizarUsuario" class="text-left">
    <v-icon @click="cancelEdit">cerrar</v-icon>
    <v-text-field
      v-model="editarUsuario.name"
      label="name"
      outlined
      dense
      required
    ></v-text-field>
    <v-text-field
      v-model="editarUsuario.apellido"
      label="Apellido"
      outlined
      dense
      required
    ></v-text-field>
    <v-btn type="submit" color="primary">Update</v-btn>
		<v-btn @click="cancelEdit">Cancel</v-btn>
  </v-form>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import Swal from "sweetalert2";
const CONFIG = useRuntimeConfig();
const { editarUsuario: initialEditarUsuario } = defineProps(['editarUsuario']);
const editarUsuario = ref(initialEditarUsuario || { id: null, name: "" });
const emit = defineEmits(["cancel"], ["update"]);

const cancelEdit = () => {
  emit("cancel");
};

const actualizarUsuario = async () => {
	isReactive(editarUsuario);
  if (editarUsuario.value && editarUsuario.value.id) {
    try {
      const { data, error } = await useFetch(
        `${CONFIG.public.API_BASE_URL}usuario/${editarUsuario.value.id}`,
        {
          method: "PATCH",
          body: {
						name: editarUsuario.value.name,
						apellido: editarUsuario.value.apellido
					},
          
        }
      );
  		emit("cancel");

      if (data.value != null) {
        Swal.fire({
          title: "Actualizacion exitosa",
          text: `${data.value.name}`,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        emit("update",true,editarUsuario.value.id, editarUsuario.value.name,
				editarUsuario.value.id,editarUsuario.value.apellido);
      } else {
        Swal.fire({
          title: "Ops!",
          icon: "warning",
          text: `${error.value?.data.message}`,
          confirmButtonText: "Accept",
        });
        emit("update", false, null, null);
      }
    } catch (error) {
      console.log("error", error);
    }
  }
};
</script>
