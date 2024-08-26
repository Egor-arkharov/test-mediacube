import { createStore, createLogger } from 'vuex';

const plugins = [];

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger());
}

export default createStore({
  state: {
    tasks: [],
  },
  mutations: {
    setTasks(state, task) {
      console.log(state.tasks);
      state.tasks.push(task);
    },
    removeTask(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    updateTask(state, { id, newName }) {
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.name = newName;
      }
    },
  },
  actions: {
    addTask({ commit }, task) {
      commit('setTasks', task);
    },
    deleteTask({ commit }, taskId) {
      commit('removeTask', taskId);
    },
    editTask({ commit }, payload) {
      commit('updateTask', payload);
    },
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    },
  },
  plugins,
});
