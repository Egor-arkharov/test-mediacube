<template>
  <div class="tasks">
    <div
      v-if="isLoading"
      class="tasks__loader"
    >
      Loading...
    </div>
    <draggable
      v-model="localTasks"
      tag="ul"
      class="tasks__list"
      :item-key="(item) => item.id"
      handle=".task__drag"
    >
      <template #item="{ element }">
        <li
          :key="element.id"
          class="tasks__task task"
        >
          <div class="task__drag">
            <inline-svg
              :src="require(`@/assets/icons/drag.svg`)"
              width="16"
              height="16"
            />
          </div>

          <input
            :id="'answer-' + element.id"
            class="checkbox__input"
            type="checkbox"
            :value="element.id"
            :checked="element.complited"
            @change="toggleTaskCompletion(element.id)"
          >

          <input
            v-if="editTaskId === element.id"
            ref="editableInput"
            v-model="editTaskName"
            class="task__input edited"
            type="text"
            @blur="saveEditTask(element.id)"
            @keydown.enter="saveEditTask(element.id)"
          >
          <input
            v-else
            class="task__input"
            type="text"
            :placeholder="element.name"
            readonly
          >

          <div class="task__btns">
            <button
              class="btn btn-edit task__edit"
              @click="editTask(element.id, element.name)"
            >
              <inline-svg
                :src="require(`@/assets/icons/edit.svg`)"
                width="16"
                height="16"
              />
            </button>
            <button
              class="btn btn-delete task__delete"
              @click="deleteTask(element.id)"
            >
              <inline-svg
                :src="require(`@/assets/icons/delete.svg`)"
                width="16"
                height="16"
              />
            </button>
          </div>
        </li>
      </template>
    </draggable>
  </div>
</template>

<script>
import { ref, nextTick, computed } from 'vue';
import { useStore } from 'vuex';
import draggable from 'vuedraggable';
import InlineSvg from 'vue-inline-svg';

export default {
  components: {
    draggable,
    InlineSvg,
  },
  setup() {
    const store = useStore();

    const isLoading = computed(() => store.getters.getLoading);
    
    const localTasks = computed({
      get: () => store.getters.getFilteredTasks,
      set: (tasks) => {
        store.dispatch('updateTaskOrder', tasks);
      }
    });

    const complitedTasks = computed(() => store.getters.getComplitedTasks);

    const editTaskId = ref(null);
    const editTaskName = ref('');
    const editableInput = ref(null);

    const editTask = (id, name) => {
      editTaskId.value = id;
      editTaskName.value = name;
      nextTick(() => {
        if (editableInput.value) {
          editableInput.value.focus();
        }
      });
    };

    const saveEditTask = (id) => {
      if (editTaskId.value === id && editTaskName.value.trim()) {
        store.dispatch('editTask', { id, newName: editTaskName.value });
        editTaskId.value = null;
      }
    };

    const deleteTask = (taskId) => {
      store.dispatch('deleteTask', taskId);
    };

    const toggleTaskCompletion = (taskId) => {
      store.dispatch('toggleTaskCompletion', taskId);

      const currentFilter = store.getters.getFilter;
      const filteredTasks = store.getters.getFilteredTasks;

      if (filteredTasks.length === 0 && (currentFilter === 'active' || currentFilter === 'complited')) {
        store.dispatch('changeFilter', 'all');
      }
    };

    return {
      isLoading,
      localTasks,
      complitedTasks,
      editTaskId,
      editTaskName,
      editableInput,
      editTask,
      saveEditTask,
      deleteTask,
      toggleTaskCompletion,
    };
  },
};
</script>

<style lang="scss" scoped>
.tasks {
  width: calc(100% + 16px);
  translate: -8px 0;
  height: 100px;
  min-height: 100px;
  overflow: hidden auto;
  padding-right: 10px;

  @include custom-scrollbar;

  &__loader {
    font-family: $main-font-bold;
    margin: 0 auto;
    width: fit-content;
    padding-bottom: 5px;
    font-size: clamp(18px, 3vw, 20px);
    background: linear-gradient(currentColor 0 0) 0 100%/0% 3px no-repeat;
    animation: line-size 2s linear infinite;
    @keyframes line-size {to{background-size: 100% 3px}}
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  @media (max-width: #{map-get($breakpoints, 'sm')}) {
    overflow: unset;
    height: auto;
    min-height: auto;
    margin: 30px 0 0;
    width: 100%;
    translate: 0;
  }
}

.task {
  display: flex;
  align-items: center;

  &__drag {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: grab;
  }

  &__input {
    border: 2px solid transparent;
    pointer-events: none;
    flex-grow: 1;
    margin-right: 15px;
    padding: 2px 5px;

    &::placeholder {
      font-size: 14px;
      line-height: 1.2;
      color: $color-black;
    }

    &:focus,
    &.edited {
      pointer-events: auto;
      border-color: rgba($color-black, 0.3);
    }
  }

  &__btns {
    display: flex;
    gap: 10px;
  }
}

.checkbox {
  &__label {
    margin: 0;
    padding-left: 8px;
  }
}

.btn {
  display: flex;

  @include hover {
    svg :deep(path) {
      fill: $color-blue;
    }
  }
}
</style>