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
					<v-icon @click="editProductCategory(productCategory) ">
            mdi-pencil
          </v-icon>
				</td>
					<!-- <td>
						<v-icon @click="editProductCategory(productCategory) ">
							mdi-pencil
						</v-icon>
						<ProductCategoryDeleteForm
						@delete-product-category="deleteItemProductCategory"
						:edited-product-category="productCategory">
					</ProductCategoryDeleteForm>
				</td> -->
    	</tr>
		</tbody>
	</v-table>
</div>
    
</template>

<script setup>
const CONFIG = useRuntimeConfig();
import { ref } from "vue";
import Swal from "sweetalert2";
const CategoryList = ref([]);

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

onMounted(async () => {
  await nextTick();
  await getCategorias();
});
</script>