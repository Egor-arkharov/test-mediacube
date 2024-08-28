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
      v-if="activeTasks.length > 0"
      class="bullets__button"
      :class="{ active: filter === 'active' }"
      @click="changeFilter('active')"
    >
      Active
    </button>
    <button
      v-if="complitedTasks.length > 0"
      class="bullets__button"
      :class="{ active: filter === 'complited' }"
      @click="changeFilter('complited')"
    >
      Complited
    </button>
    <button
      v-if="complitedTasks.length > 0"
      class="bullets__button"
      @click="deleteComplitedTasks"
    >
      Clear complited
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

    const complitedTasks = computed(() =>
      tasks.value.filter(task => task.complited)
    );

    const activeTasks = computed(() =>
      tasks.value.filter(task => !task.complited)
    );

    const checkAllTasks = () => {
      store.dispatch('checkAllTasks');
    };

    const deleteComplitedTasks = () => {
      store.dispatch('deleteComplitedTasks');
    };

    return {
      filter,
      complitedTasks,
      activeTasks,
      changeFilter,
      checkAllTasks,
      deleteComplitedTasks,
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

  @media (max-width: #{map-get($breakpoints, 'xs')}) {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>

