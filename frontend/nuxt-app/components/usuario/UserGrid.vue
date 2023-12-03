<template>
	<div>
		<v-table fixed-header
    height="400px">
    <thead>
      <tr>
        <th>Name
          <v-col cols="5">
            <!-- <v-text-field
            v-model="filters.name"
            clearable
            @keyup.enter="updatePage(1)"
            @click:clear="updatePage(1)"
            ></v-text-field> -->
          </v-col>
        </th>
				<th>Apellido
					<v-col>

					</v-col>
				</th>
        <th>Creation
          <v-col cols="5">
            <!-- <v-text-field
            v-model="filters.created_at"
            clearable
            @keyup.enter="updatePage(1)"
            @click:clear="updatePage(1)"
            ></v-text-field> -->
          </v-col>
        </th>
        <th>Actions
					<v-col>

					</v-col>
				</th>
      </tr>
    </thead>
    <!-- <v-alert color="blue" v-if="noRecordsFound" type="error" dismissible>
      No records found.
    </v-alert> -->
    <tbody>
      <tr v-for="User in UserList" :key="User.id">
        <td>{{ User.name }}</td>
        <td>{{ User.apellido }}</td>
        <td>{{User.created_at}}</td>
				<td>
					<v-icon @click="editaUsuario(User) ">
            mdi-pencil
          </v-icon>
					<UserDelete
					@delete-usuario="deleteUsuario"
					:editar-usuario="User">
					</UserDelete>
				</td>
    	</tr>
		</tbody>
	</v-table>
	<v-dialog v-model="showEditDialog" width="800" height="auto">
		<v-card>
        <v-row>
          <v-col offset="11" cols="1">
          </v-col>
        </v-row>
	<UserUpdate
    :editar-usuario="editarUsuario"
    @update="editeUsuario"
    @cancel="cancelEdit"
  ></UserUpdate> 
</v-card>

	</v-dialog>	
</div>
    
</template>

<script setup>
const CONFIG = useRuntimeConfig();
import { ref } from "vue";
//import Swal from "sweetalert2";
const UserList = ref([]);
const editarUsuario = ref({id: null, name: "" });
const showEditDialog = ref(false);


const getUsuarios = async () => {
	try {
		
		const { data, error } = await useFetch(
			`${CONFIG.public.API_BASE_URL}usuarios`,
			{
				method: "GET",
			}

		)
    UserList.value=data.value;
	} catch (error) {
		console.log('error', error)
	}
}

const editaUsuario = (Usuario) => {
  if (Usuario && Usuario.id) {
    editarUsuario.value = { ...Usuarios };
    showEditDialog.value = true;
  }else{
    console.error("no valido");
  }
};

const cancelEdit = () => {
  showEditDialog.value = false;
  editarUsuario.value = { id: null, name: "" };
};

onMounted(async () => {
  await nextTick();
  await getUsuarios();
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