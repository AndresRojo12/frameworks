<template>
	<div>
    <v-card>
      <v-card-title>
        Usuarios
        <v-row>
          <v-col md="6">
            <v-btn variant="tonal" color="cyan-darken-1"
              @click="redirectUsuarioCreate"
              elevation="2"
              title="Create"
              >create
            </v-btn>
		      </v-col>
          <v-col cols="5">
            <v-select
            v-model="itemsPerPage"
            :items="perPageOptions"
            label="data per page"
            @change="updatePage(1)"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-title>
    </v-card>
		<v-table class="color" fixed-header
    height="400px">
    <thead>
      <tr>
        <th>Name
          <v-col cols="5">
            <v-text-field
            v-model="filters.name"
            clearable
            @keyup.enter="updatePage(1)"
            @click:clear="updatePage(1)"
            ></v-text-field>
          </v-col>
        </th>
				<th>Apellido
					<v-col>
            <v-text-field
            v-model="filters.apellido"
            clearable
            @keyup.enter="updatePage(1)"
            @click:clear="updatePage(1)"
            ></v-text-field>
					</v-col>
				</th>
        <th>Creation
          <v-col cols="5">
            <v-text-field
            v-model="filters.created_at"
            clearable
            @keyup.enter="updatePage(1)"
            @click:clear="updatePage(1)"
            ></v-text-field>
          </v-col>
        </th>
        <th>Actions
					<v-col>

					</v-col>
				</th>
      </tr>
    </thead>
    <v-alert color="blue" v-if="noRecordsFound" type="error" dismissible>
      No records found.
    </v-alert>
    <tbody>
      <tr v-for="User in UserList" :key="User.id">
        <td>{{ User.name }}</td>
        <td>{{ User.apellido }}</td>
        <td>{{User.created_at}}</td>
				<td>
					<v-icon @click="editaUsuario(User) ">
            mdi-pencil
          </v-icon>
					<UsuarioUserDelete
					@delete-usuario="deleteUsuario"
					:editar-usuario="User">
          </UsuarioUserDelete>
				</td>
    	</tr>
		</tbody>
	</v-table>
  <v-pagination
      v-model="currentPage"
      :length="totalPages"
    >
      <template #item="{ page }">
        <v-btn @click="goToPage(page)">{{ page }}</v-btn>
      </template>
    </v-pagination>

	<v-dialog v-model="showEditDialog" width="800" height="auto">
		<v-card>
        <v-row>
          <v-col offset="11" cols="1">
          </v-col>
        </v-row>
	<UsuarioUserUpdate
    :editar-usuario="editarUsuario"
    @update="editeUsuario"
    @cancel="cancelEdit"
  ></UsuarioUserUpdate>
</v-card>

	</v-dialog>	
</div>
    
</template>

<script setup>
//import { ref, onMounted, nextTick, watch } from "vue";
const CONFIG = useRuntimeConfig();
import { ref } from "vue";
//import UserDelete from "./UserDelete.vue";
//import Swal from "sweetalert2";
const UserList = ref([]);
const editarUsuario = ref({id: null, name: "" });
const showEditDialog = ref(false);
const router = useRouter();


const currentPage = ref(1); // Número de página actual
const itemsPerPage = ref(10); // Cantidad de elementos por página
const totalPages = ref(1);
const filters = ref({
  name: "",
  apellido: "",
  created_at: "", // Agrega más propiedades de filtro según sea necesario
});

const perPageOptions = [2, 20, 30, 40, 100];
watch(itemsPerPage, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    updatePage(1); // Actualiza la página al cambiar la cantidad por página
  }
}); 

const noRecordsFound = ref(false);

const getUsuarios = async (page, filters) => {
	try {
		
		const { data, error } = await useFetch(
			`${CONFIG.public.API_BASE_URL}usuarios`,
			{
				method: "GET",
        params: {
          page: page,
          perPage: itemsPerPage.value,
          ...filters
        }
			}

		)
    UserList.value=data.value.data
    totalPages.value = data.value.totalPages;
    noRecordsFound.value = UserList.value.length=== 0; 
	} catch (error) {
		console.log('error', error)
	}
}

const updatePage = (newPage) => {
  currentPage.value = newPage; // Actualiza la página actual con el valor seleccionado
  getUsuarios(currentPage.value, filters.value); // Llama a la función para obtener los datos de la nueva página
};

const redirectUsuarioCreate = () => {
    router.push('/usuario/create')
  }
  const redirectUsuarioGrid = () => {
    router.push('/usuario')
  }

const editaUsuario = (User) => {
  if (User && User.id) {
    editarUsuario.value = { ...User };
    showEditDialog.value = true;
  }else{
    console.error("no valido");
  }
};

const cancelEdit = () => {
  showEditDialog.value = false;
  editarUsuario.value = { id: null, name: "" };
  redirectUsuarioGrid();
};

const goToPage = (page) => {
  currentPage.value = page; // Actualiza la página actual con la página seleccionada
  getUsuarios(page); // Llama a la función para obtener los datos de la página seleccionada
};
onMounted(async () => {
  await nextTick();
  await getUsuarios(currentPage.value);
});
const deleteUsuario = (isDeleteUsuario, idUsuario) => {
	if (isDeleteUsuario) {
		const index = UserList.value.findIndex(
			(item) => item.id === idUsuario
		);
	UserList.value.splice(index, 1);
	}
}

const editeUsuario = (updatedData, idUsuario, name) => {
// console.log('first', updatedData)
// console.log('name', name)
if (updatedData) {
  const index = UserList.value.findIndex(
    (item) => item.id === idUsuario
    
  );
    UserList.value[index].name = name
    UserList.value[index].name
  
}
showEditDialog.value = false;

}

</script>
