<template>
  <div class="todo__bullets bullets">
    <button
      class="bullets__button"
      @click="checkAllTasks"
    >
      Check all
    </button>
    <button
      class="bullets__button"
      :class="{ active: filter === 'all' }"
      @click="changeFilter('all')"
    >
      All
    </button>
    <button
      class="bullets__button"
      :class="{ active: filter === 'active' }"
      @click="changeFilter('active')"
    >
      Active
    </button>
    <button
      class="bullets__button"
      :class="{ active: filter === 'completed' }"
      @click="changeFilter('completed')"
    >
      Completed
    </button>
    <button
      v-if="completedTasks.length > 0"
      class="bullets__button"
      @click="clearCompletedTasks"
    >
      Clear completed
    </button>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const filter = computed(() => store.getters.getFilter);
		const tasks = computed(() => store.getters.getTasks);

    const changeFilter = (newFilter) => {
      store.dispatch('changeFilter', newFilter);
    };

    const completedTasks = computed(() =>
      tasks.value.filter(task => task.completed)
    );

    const checkAllTasks = () => {
      store.dispatch('checkAllTasks');
    };

    const clearCompletedTasks = () => {
      store.dispatch('clearCompletedTasks');
    };

    return {
      filter,
      changeFilter,
      completedTasks,
      checkAllTasks,
      clearCompletedTasks,
    };
  },
};
</script>

<style lang="scss" scoped>
.bullets {
  display: flex;
  gap: 10px;
  margin: 0 0 40px;

  &__button {
    font-family: $main-font-bold;
    font-size: 14px;
    line-height: 1.2;

    padding: 10px 12px;
    color: $color-black;
    white-space: nowrap;

    // background-color: $color-blue;
    // border: 2px solid $color-blue;
    border-radius: 10px;

    // transition: all 0.2s ease;

    &.active {
      color: $color-white;
      background-color: $color-blue;
    }

		@include hover {
			color: $color-white;
      background-color: lighten($color-blue, 10%);
		}
  }
}
</style>

