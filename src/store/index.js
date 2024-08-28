import { createStore } from "vuex";
import { db, ref, set, get, remove, update } from "@/use/fireBaseStore";

const plugins = [];

// if (process.env.NODE_ENV === 'development') {
//   plugins.push(createLogger());
// }

const state = {
  tasks: [],
  filter: "all",
};

const getters = {
  getTasks(state) {
    return state.tasks;
  },
  getComplitedTasks(state) {
    return state.tasks.filter((task) => task.complited).length;
  },
  getFilter(state) {
    return state.filter;
  },
  getFilteredTasks: (state) => {
    if (state.filter === "active") {
      return state.tasks.filter((task) => !task.complited);
    }
    if (state.filter === "complited") {
      return state.tasks.filter((task) => task.complited);
    }
    return state.tasks;
  },
};

const mutations = {
  setTask(state, task) {
    state.tasks.push(task);
  },
  removeTask(state, taskId) {
    state.tasks = state.tasks.filter((task) => task.id !== taskId);
  },
  updateTask(state, { id, newName }) {
    const task = state.tasks.find((task) => task.id === id);
    if (task) {
      task.name = newName;
    }
  },
  setTaskCompletion(state, taskId) {
    const task = state.tasks.find((task) => task.id === taskId);
    if (task) {
      task.complited = !task.complited;
    }
  },
  setAllChecked(state) {
    state.tasks.forEach((task) => (task.complited = true));
  },
  removeCompletedTasks(state) {
    state.tasks = state.tasks.filter((task) => !task.complited);
  },
  setFilter(state, newFilter) {
    state.filter = newFilter;
  },
  setTaskOrder(state, tasks) {
    state.tasks = tasks;
  },
};

const actions = {
  async loadTasks({ commit }) {
    const tasksRef = ref(db, "tasks");
    const snapshot = await get(tasksRef);

    console.log(snapshot.val())

    if (snapshot.exists()) {
      const tasks = snapshot.val();
      commit("setTaskOrder", Object.values(tasks));
    }
  },
  async addTask({ commit }, task) {
    const taskId = Date.now().toString();
    task.id = taskId;
    const taskRef = ref(db, `tasks/${taskId}`);
    await set(taskRef, task);
    commit("setTask", task);
  },
  async deleteTask({ commit }, taskId) {
    const taskRef = ref(db, `tasks/${taskId}`);
    await remove(taskRef);
    commit("removeTask", taskId);
  },
  async editTask({ commit }, payload) {
    const { id, newName } = payload;
    const taskRef = ref(db, `tasks/${id}`);
    await update(taskRef, { name: newName });
    commit("updateTask", payload);
  },
  async toggleTaskCompletion({ commit }, taskId) {
    const taskRef = ref(db, `tasks/${taskId}`);
    const snapshot = await get(taskRef);

    if (snapshot.exists()) {
      const task = snapshot.val();
      await update(taskRef, { complited: !task.complited });
      commit("setTaskCompletion", taskId);
    }
  },
  async checkAllTasks({ commit }) {
    const tasksRef = ref(db, "tasks");
    const snapshot = await get(tasksRef);
    if (snapshot.exists()) {
      const tasks = snapshot.val();
      const updates = {};
      Object.keys(tasks).forEach((key) => {
        updates[`tasks/${key}/complited`] = true;
      });
      await update(ref(db), updates);
      commit("setAllChecked");
    }
  },
  async deleteComplitedTasks({ commit }) {
    const tasksRef = ref(db, "tasks");
    const snapshot = await get(tasksRef);
    if (snapshot.exists()) {
      const tasks = snapshot.val();
      const updates = {};
      Object.keys(tasks).forEach((key) => {
        if (tasks[key].complited) {
          updates[`tasks/${key}`] = null;
        }
      });
      await update(ref(db), updates);
      commit("removeCompletedTasks");
    }
  },
  changeFilter({ commit }, newFilter) {
    commit("setFilter", newFilter);
  },
  updateTaskOrder({ commit }, tasks) {
    commit("setTaskOrder", tasks);
  },
};

export default createStore({
  state,
  getters,
  mutations,
  actions,
  plugins,
});
