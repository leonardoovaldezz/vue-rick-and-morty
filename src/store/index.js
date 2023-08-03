import { createStore } from 'vuex'

export default createStore({
  state: {
    characters: [],
    charactersFilter: [],
    currentPage: 1,
    itemsPerPage: 20 
  },

  mutations: {
    setCharacters(state, payload) {
      state.characters = payload
    },
    setCharactersFilter(state, payload) {
      state.charactersFilter = payload;
    },
    setCurrentPage(state, page) {
      state.currentPage = page;
    }
  },
  getters: {
    paginatedCharacters(state) {
      const startIndex = (state.currentPage - 1) * state.itemsPerPage;
      const endIndex = startIndex + state.itemsPerPage;
      return state.charactersFilter.slice(startIndex, endIndex);
    }
  },

  actions: {
    async getCharacters({ commit }) {
      try {
        const numberOfPages = 42; 
        const charactersPerPage = 20; 

        const allCharacters = [];
        for (let page = 1; page <= numberOfPages; page++) {
          const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
          const data = await response.json();
          allCharacters.push(...data.results);
        }

        commit('setCharacters', allCharacters);
        commit('setCharactersFilter', allCharacters);
      } catch (error) {
        console.error(error);
      }
    },
    filterByStatus({ commit, state }, status) {
      const filter = state.characters.filter((character) => {
        return character.status.includes(status)
      })
      commit('setCharactersFilter', filter)
    },
    filterByName({ commit, state }, name) {
      const formatName = name.toLowerCase()
      const filter = state.characters.filter((character) => {
        const characterName = character.name.toLowerCase()
        if (characterName.includes(formatName)) {
          return character
        }
      })
      commit('setCharactersFilter', filter)
    }
  },
  modules: {
  }
})