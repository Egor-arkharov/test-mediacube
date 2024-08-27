<template>
  <div class="tasks">
    <draggable
      v-model="tasks"
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
            :checked="element.completed"
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
    const tasks = computed(() => store.getters.getFilteredTasks);
    const completedTasks = computed(() => store.getters.getCompletedTasks);

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
    };

    return {
      tasks,
      completedTasks,
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
  $scrollbar-bc: rgba($color-black, 0.1);
  $scrollbar-thumb-bc: $color-black;

  width: calc(100% + 16px);
  translate: -8px 0;
  max-height: 100px;
  overflow: hidden auto;
  padding-right: 10px;

  @supports selector(::-webkit-scrollbar) {
    &::-webkit-scrollbar {
      width: 4px;
      border-radius: 10px;
      background-color: $scrollbar-bc;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: $scrollbar-thumb-bc;
      cursor: pointer;

      @include hover {
        background-color: rgba($scrollbar-thumb-bc, 0.6);
      }
    }
  }

  @supports not selector(::-webkit-scrollbar) {
    cursor: pointer;
    scrollbar-width: thin;
    scrollbar-color: $scrollbar-thumb-bc $scrollbar-bc;
  }

  
  &__list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  &__task {
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

    // svg :deep(path) {
    //   fill: rgba($color-black, 0.3);
    // }

    // @include hover {
    //   svg :deep(path) circle {
    //     fill: $color-black;
    //   }
    // }
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

  &__edit {
  }

  &__delete {
  }
}

.checkbox {
  &__label {
    margin: 0;
    padding-left: 8px;
  }
  &__input {
  }
  &__box {
  }
  &__text {
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