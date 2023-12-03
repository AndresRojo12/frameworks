<template>
  <v-icon @click="eliminarUsuario" color="error">mdi-delete</v-icon>
</template>

<script setup>
import { ref, defineProps, inject } from "vue";
import Swal from "sweetalert2";

const CONFIG = useRuntimeConfig();
const { editarUsuario: initialEditarUsuario } = defineProps([
  'editarUsuario',
]);
const emit = defineEmits(['deleteUser']);
const editarUsuario = ref(initialEditarUsuario || { id: null, name: "" });

const eliminarUsuario = async () => {
  if (editarUsuario.value && editarUsuario.value.id) {
    const confirmDeletion = await Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
    });

    if (confirmDeletion.isConfirmed) {
      try {
        const { data, error } = await useFetch(
          `${CONFIG.public.API_BASE_URL}categorias/${editarUsuario.value.id}`,
          {
            method: "DELETE",
          }
        );
        if (data.value != null) {
          await Swal.fire({
            title: "Success!",
            text: `${data.value.message}`,
            icon: "success",
            confirmButtonText: "Accept",
          });

          this.$emit("deleteUser", true, editarUsuario.value.id);
          // Emitir el evento personalizado 'specie-deleted'

          // Elimina el elemento de la lista petSpecie
        } else {
          await Swal.fire({
            title: "Ops!",
            icon: "warning",
            text: `${error.value?.data.message}`,
            confirmButtonText: "Accept",
          });
        emit("deleteUser", false, null);
        }
      } catch (error) {
        console.error("Error en la solicitud de eliminación:", error);
      }
    }
  }
};
</script>
