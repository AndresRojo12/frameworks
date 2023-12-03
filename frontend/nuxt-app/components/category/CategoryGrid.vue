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
				<th>Description
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
      <tr v-for="Categoris in CategoryList" :key="Categoris.id">
        <td>{{ Categoris.name }}</td>
        <td>{{ Categoris.description }}</td>
        <td>{{Categoris.created_at}}</td>
				<td>
					<v-icon @click="editaCategoria(Categoris) ">
            mdi-pencil
          </v-icon>
					<CategoryDelete
					@delete-category="deleteCategory"
					:editar-categoria="Categoris">
					</CategoryDelete>
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
	<CategoryUpdate
    :editar-categoria="editarCategoria"
    @update="editeCategoria"
    @cancel="cancelEdit"
  ></CategoryUpdate> 
</v-card>

	</v-dialog>	
</div>
    
</template>

<script setup>
const CONFIG = useRuntimeConfig();
import { ref } from "vue";
//import Swal from "sweetalert2";
const CategoryList = ref([]);
const editarCategoria = ref({id: null, name: "" });
const showEditDialog = ref(false);


const getCategorias = async () => {
	try {
		
		const { data, error } = await useFetch(
			`${CONFIG.public.API_BASE_URL}categorias`,
			{
				method: "GET",
			}

		)
    CategoryList.value=data.value;
	} catch (error) {
		console.log('error', error)
	}
}

const editaCategoria = (Categoris) => {
  if (Categoris && Categoris.id) {
    editarCategoria.value = { ...Categoris };
    showEditDialog.value = true;
  }else{
    console.error("no valido");
  }
};

const cancelEdit = () => {
  showEditDialog.value = false;
  editarCategoria.value = { id: null, name: "" };
};

onMounted(async () => {
  await nextTick();
  await getCategorias();
});
const deleteCategory = (isDeleteCategoria, idCategoria) => {
	if (isDeleteCategoria) {
		const index = CategoryList.value.findIndex(
			(item) => item.id === idCategoria
		);
	CategoryList.value.splice(index, 1);
	}
}

const editeCategoria = (updatedData, idCategory, name) => {
// console.log('first', updatedData)
// console.log('name', name)
if (updatedData) {
  const index = CategoryList.value.findIndex(
    (item) => item.id === idCategory
    
  );
    CategoryList.value[index].name = name
    console.log('ingresando categiria list',CategoryList.value[index].name )
  
}
showEditDialog.value = false;

}

</script>