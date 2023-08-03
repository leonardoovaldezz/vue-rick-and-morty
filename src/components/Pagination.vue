<template>
  <div class="pagination">
    <button @click="previousPage" :disabled="currentPage === 1">
      Anterior
    </button>
    <span>P&aacute;gina {{ currentPage }} of {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">
      Siguiente
    </button>
  </div>
</template>
    
  <script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();
    const currentPage = computed(() => store.state.currentPage);
    const totalPages = computed(() => {
      return Math.ceil(
        store.state.charactersFilter.length / store.state.itemsPerPage
      );
    });

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        store.commit("setCurrentPage", currentPage.value + 1);
      }
    };

    const previousPage = () => {
      if (currentPage.value > 1) {
        store.commit("setCurrentPage", currentPage.value - 1);
      }
    };

    return {
      currentPage,
      totalPages,
      nextPage,
      previousPage,
    };
  },
};
</script>
    
  
  <style lang="scss">
/* Your styles remain unchanged */
</style>
  
  
  <style lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;

  button {
    margin: 0 5px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  span {
    margin: 0 10px;
    font-size: 1.2rem;
  }
}
</style>
  