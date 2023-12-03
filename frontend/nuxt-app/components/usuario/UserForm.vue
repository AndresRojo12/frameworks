<template>
	<v-app>
    <container>
       <v-form @submit.prevent="crearUser" class="text-left">
					<v-col cols="12" sm="6">
						<v-text-field
              v-model="datos.usuarios.name"
              label="name"
              outlined
              dense
              required
            ></v-text-field>
					</v-col>
					<v-col cols="12" sm="6">
            <v-text-field
              v-model="datos.usuarios.apellido"
              label="Apellido"
              outlined
              dense
              required
            ></v-text-field>
          </v-col>
					<v-btn
          type="submit"
          class="tex-left"
          color="deep-orange-lighten-2"
          >Create</v-btn
        >
        <v-btn variant="tonal"
            to="/usuarios"
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
	usuarios:{
		name: "",
		apellido: "",
	}
});


const crearUser = async () => {
	try {
		const payusuarios = {
			name: datos.value.usuarios.name,
			description: datos.value.usuarios.apellido,
      created_by: datos.value.usuarios.created_by,


		}
		const { data, error } = await useFetch(
			`${CONFIG.public.API_BASE_URL}usuarios`,
			{
				method: "POST",
				body: payusuarios
			}

		)
		if (data.value !=null) {
			Swal.fire({
				title: "Creacion exitosa",
				text: `${data.value}`,
				icon: "success",
        confirmButtonText: "Aceptar",
			});

			datos.value.usuarios.name = "",
			datos.value.usuarios.apellido = ""

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