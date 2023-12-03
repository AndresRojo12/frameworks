<template>
	<v-app>
	<H1>Crear Categorias</H1>
    <container>
       <v-form @submit.prevent="crearCategory" class="text-left">
					<v-col cols="12" sm="6">
						<v-text-field
              v-model="datos.categorias.name"
              label="name"
              outlined
              dense
              required
            ></v-text-field>
					</v-col>
					<v-col cols="12" sm="6">
            <v-textarea
              v-model="datos.categorias.description"
              label="Description"
              outlined
              dense
              required
            ></v-textarea>
          </v-col>
					<v-btn
          type="submit"
          class="tex-left"
          color="deep-orange-lighten-2"
          >Create</v-btn
        >
        <v-btn variant="tonal"
            to="/categorias"
            class="ml-3"
            elevation="2">
            Cancel
          </v-btn>
			 </v-form>
    </container>
	</v-app>
</template>

<script setup>
const CONFIG = useRuntimeConfig();
import { ref } from "vue";
import Swal from "sweetalert2";
const datos = ref({
	categorias:{
		name: "",
		description: "",
	}
});


const crearCategory = async () => {
	try {
		const payCategories = {
			name: datos.value.categorias.name,
			description: datos.value.categorias.description,
      created_by: datos.value.categorias.created_by,


		}
		const { data, error } = await useFetch(
			`${CONFIG.public.API_BASE_URL}categorias`,
			{
				method: "POST",
				body: payCategories
			}

		)
		if (data.value !=null) {
			Swal.fire({
				title: "Creacion exitosa",
				text: `${data.value}`,
				icon: "success",
        confirmButtonText: "Aceptar",
			});

			datos.value.categorias.name = "",
			datos.value.categorias.description = ""

		}else {
			Swal.fire({
        title: "Ops!",
        icon: "warning",
        text: `${error.value?.data.message}`,
        confirmButtonText: "Accept",
      });
		}
	} catch (error) {
		console.log('error', error)
	}
}
</script>