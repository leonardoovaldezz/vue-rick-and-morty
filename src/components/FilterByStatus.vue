<template>
  <div class="filter">
    <div class="item" @click="filter('')">Todos</div>
    <div class="item" @click="filter('Alive')">Vivos</div>
    <div class="item" @click="filter('Dead')">Muertos</div>
    <div class="item" @click="filter('unknown')">Desconocidos</div>
  </div>
</template>
  
<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const filter = (status) => {
      store.dispatch("filterByStatus", status);
    };

    return {
      filter,
    };
  },
};
</script>
  
<style lang="scss">
.filter {
  width: 400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-radius: 10px;
  overflow: hidden;
  .item {
    padding: 1rem 0.5rem;
    background-color: var(--background-card);
    text-align: center;
    cursor: pointer;
    &:hover {
      color: var(--text-orange);
    }
  }
}
</style>