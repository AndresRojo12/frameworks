<template>
  <div>
    <v-card>
      <v-card-title>
        Categorias
        <v-row>
          <v-col md="6">
            <v-btn
              variant="tonal"
              color="cyan-darken-1"
              @click="redirectCategoriaCreate"
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
    <v-table fixed-header height="400px">
      <thead>
        <tr>
          <th>
            Name
            <v-col cols="5">
              <v-text-field
                v-model="filters.name"
                clearable
                @keyup.enter="updatePage(1)"
                @click:clear="updatePage(1)"
              ></v-text-field>
            </v-col>
          </th>
          <th>
            Description
            <v-col>
              <v-text-field
                v-model="filters.description"
                clearable
                @keyup.enter="updatePage(1)"
                @click:clear="updatePage(1)"
              ></v-text-field>
            </v-col>
          </th>
          <th>
            Creation
            <v-col cols="5">
              <v-text-field
                v-model="filters.created_at"
                clearable
                @keyup.enter="updatePage(1)"
                @click:clear="updatePage(1)"
              ></v-text-field>
            </v-col>
          </th>
          <th>
            Actions
            <v-col> </v-col>
          </th>
        </tr>
      </thead>
      <v-alert color="blue" v-if="noRecordsFound" type="error" dismissible>
        No se encontraron registros.
      </v-alert>
      <tbody>
        <tr v-for="Categoris in CategoryList" :key="Categoris.id">
          <td>{{ Categoris.name }}</td>
          <td>{{ Categoris.description }}</td>
          <td>{{ Categoris.created_at }}</td>
          <td>
            <v-icon @click="editaCategoria(Categoris)"> mdi-pencil </v-icon>
            <CategoryDelete
              @delete-category="deleteCategory"
              :editar-categoria="Categoris"
            >
            </CategoryDelete>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination v-model="currentPage" :length="totalPages">
      <template #item="{ page }">
        <v-btn @click="goToPage(page)">{{ page }}</v-btn>
      </template>
    </v-pagination>
    <v-dialog v-model="showEditDialog" width="800" height="auto">
      <v-card>
        <v-row>
          <v-col offset="11" cols="1"> </v-col>
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

const CategoryList = ref([]);
const editarCategoria = ref({ id: null, name: "" });
const showEditDialog = ref(false);
const router = useRouter();

const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalPages = ref(1);
const filters = ref({
  name: "",
  description: "",
  created_at: "",
});

const perPageOptions = [2, 20, 30, 40, 100];
watch(itemsPerPage, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    updatePage(1);
  }
});

const noRecordsFound = ref(false);

const getCategorias = async (page, filters) => {
  try {
    const { data, error } = await useFetch(
      `${CONFIG.public.API_BASE_URL}categorias`,
      {
        method: "GET",
        params: {
          page: page,
          perPage: itemsPerPage.value,
          ...filters,
        },
      }
    );
    CategoryList.value = data.value.data;
    totalPages.value = data.value.totalPages;
    noRecordsFound.value = CategoryList.value.length === 0;
  } catch (error) {
    console.log("error", error);
  }
};

const updatePage = (newPage) => {
  currentPage.value = newPage;
  getCategorias(currentPage.value, filters.value);
};

const redirectCategoriaCreate = () => {
  router.push("/category/create");
};
const redirectCategoriaGrid = () => {
  router.push("/categorias");
};

const editaCategoria = (Categoris) => {
  if (Categoris && Categoris.id) {
    editarCategoria.value = { ...Categoris };
    showEditDialog.value = true;
  } else {
    console.error("no valido");
  }
};

const cancelEdit = () => {
  showEditDialog.value = false;
  editarCategoria.value = { id: null, name: "" };
  //redirectCategoriaGrid();
};

const goToPage = (page) => {
  currentPage.value = page;
  getCategorias(page);
};

onMounted(async () => {
  await nextTick();
  await getCategorias(currentPage.value);
});
const deleteCategory = (isDeleteCategoria, idCategoria) => {
  if (isDeleteCategoria) {
    const index = CategoryList.value.findIndex(
      (item) => item.id === idCategoria
    );
    CategoryList.value.splice(index, 1);
  }
};

const editeCategoria = (updatedData, idCategory, name) => {
  if (updatedData) {
    const index = CategoryList.value.findIndex(
      (item) => item.id === idCategory
    );
    CategoryList.value[index].name = name;
    CategoryList.value[index].name;
  }
  showEditDialog.value = false;
};
</script>
