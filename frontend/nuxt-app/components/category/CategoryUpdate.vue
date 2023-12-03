<template>
  <v-form @submit.prevent="actualizarCategoria" class="text-left">
    <v-icon @click="cancelEdit">cerrar</v-icon>
    <v-text-field
      v-model="editarCategoria.name"
      label="name"
      outlined
      dense
      required
    ></v-text-field>
    <v-text-field
      v-model="editarCategoria.description"
      label="Description"
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
const { editarCategoria: initialEditarCategory } = defineProps(['editarCategoria']);
const editarCategoria = ref(initialEditarCategory || { id: null, name: "" });
const emit = defineEmits(["cancel"], ["update"]);

const cancelEdit = () => {
  emit("cancel");
};

const actualizarCategoria = async () => {
	isReactive(editarCategoria);
  if (editarCategoria.value && editarCategoria.value.id) {
    try {
      const { data, error } = await useFetch(
        `${CONFIG.public.API_BASE_URL}categorias/${editarCategoria.value.id}`,
        {
          method: "PATCH",
          body: {
						name: editarCategoria.value.name,
						description: editarCategoria.value.description
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
        emit("update",true,editarCategoria.value.id, editarCategoria.value.name,
				editarCategoria.value.id,editarCategoria.value.description);
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
