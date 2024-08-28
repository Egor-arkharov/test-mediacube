import { createStore, createLogger } from "vuex";
import { db, ref, set, get, remove, update } from "@/use/fireBaseStore";

const plugins = [];

if (process.env.NODE_ENV === "development") {
  plugins.push(createLogger());
}

const state = {
  tasks: [],
  filter: "all",
  loading: false,
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
  getLoading(state) {
    return state.loading;
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
  setLoading(state, isLoading) {
    state.loading = isLoading;
  },
};

const actions = {
  async loadTasks({ commit }) {
    commit("setLoading", true);

    try {
      const tasksRef = ref(db, "tasks");
      const snapshot = await get(tasksRef);

      if (snapshot.exists()) {
        const tasks = snapshot.val();
        commit("setTaskOrder", Object.values(tasks));
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      commit("setLoading", false);
    }
  },

  async addTask({ commit }, task) {
    try {
      const taskId = Date.now().toString();
      task.id = taskId;
      const taskRef = ref(db, `tasks/${taskId}`);
      await set(taskRef, task);
      commit("setTask", task);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  },

  async deleteTask({ commit }, taskId) {
    try {
      const taskRef = ref(db, `tasks/${taskId}`);
      await remove(taskRef);
      commit("removeTask", taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  },

  async editTask({ commit }, payload) {
    try {
      const { id, newName } = payload;
      const taskRef = ref(db, `tasks/${id}`);
      await update(taskRef, { name: newName });
      commit("updateTask", payload);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  },

  async toggleTaskCompletion({ commit }, taskId) {
    try {
      const taskRef = ref(db, `tasks/${taskId}`);
      const snapshot = await get(taskRef);

      if (snapshot.exists()) {
        const task = snapshot.val();
        await update(taskRef, { complited: !task.complited });
        commit("setTaskCompletion", taskId);
      }
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  },

  async checkAllTasks({ commit }) {
    try {
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
    } catch (error) {
      console.error("Error checking all tasks:", error);
    }
  },

  async deleteComplitedTasks({ commit }) {
    try {
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
    } catch (error) {
      console.error("Error deleting completed tasks:", error);
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
