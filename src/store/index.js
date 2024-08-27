import { createStore } from 'vuex';

const plugins = [];

// if (process.env.NODE_ENV === 'development') {
//   plugins.push(createLogger());
// }

export default createStore({
  state: {
    tasks: [],
    filter: 'all', 
  },
  mutations: {
    setTasks(state, task) {
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
    setTaskCompletion(state, taskId) {
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setAllChecked(state) {
      state.tasks.forEach(task => task.completed = true);
    },
    clearCompletedTasks(state) {
      state.tasks = state.tasks.filter(task => !task.completed);
    },
    setFilter(state, newFilter) {
      state.filter = newFilter;
    },
    setTaskOrder(state, tasks) {
      state.tasks = tasks;
    },
  },
  actions: {
    addTask({ commit }, task) {
      task.completed = false;
      commit('setTasks', task);
    },
    deleteTask({ commit }, taskId) {
      commit('removeTask', taskId);
    },
    editTask({ commit }, payload) {
      commit('updateTask', payload);
    },
    toggleTaskCompletion({ commit }, taskId) {
      commit('setTaskCompletion', taskId);
    },
    checkAllTasks({ commit }) {
      commit('setAllChecked');
    },
    clearCompletedTasks({ commit }) {
      commit('clearCompletedTasks');
    },
    changeFilter({ commit }, newFilter) {
      commit('setFilter', newFilter);
    },
    updateTaskOrder({ commit }, tasks) {
      commit('setTaskOrder', tasks);
    },
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    },
    getCompletedTasks(state) {
      return state.tasks.filter(task => task.completed).length;
    },
    getFilter(state) {
      return state.filter;
    },
    getFilteredTasks: (state) => {
      if (state.filter === 'active') {
        return state.tasks.filter(task => !task.completed);
      }
      if (state.filter === 'completed') {
        return state.tasks.filter(task => task.completed);
      }
      return state.tasks;
    },
  },
  plugins,
});
