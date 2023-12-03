<template>
  <v-icon @click="eliminarCategoria" color="error">mdi-delete</v-icon>
</template>

<script setup>
import { ref, defineProps, inject } from "vue";
import Swal from "sweetalert2";

const CONFIG = useRuntimeConfig();
const { editarCategoria: initialEditarCategory } = defineProps([
  'editarCategoria',
]);
const emit = defineEmits(['deleteCategory']);
const editarCategoria = ref(initialEditarCategory || { id: null, name: "" });

const eliminarCategoria = async () => {
  if (editarCategoria.value && editarCategoria.value.id) {
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
          `${CONFIG.public.API_BASE_URL}categorias/${editarCategoria.value.id}`,
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

          this.$emit("deleteCategory", true, editarCategoria.value.id);
          // Emitir el evento personalizado 'specie-deleted'

          // Elimina el elemento de la lista petSpecie
        } else {
          await Swal.fire({
            title: "Ops!",
            icon: "warning",
            text: `${error.value?.data.message}`,
            confirmButtonText: "Accept",
          });
        emit("deleteCategory", false, null);
        }
      } catch (error) {
        console.error("Error en la solicitud de eliminación:", error);
      }
    }
  }
};
</script>
