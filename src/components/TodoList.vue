<template>
  <div class="tasks">
    <draggable
      v-model="list"
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
            :name="'answer-' + element.id"
          >

          <input 
            class="task__input" 
            type="text" 
            :placeholder="element.name"
          >

          <div class="task__btns">
            <button class="btn btn-edit task__edit">
              <inline-svg
                :src="require(`@/assets/icons/edit.svg`)"
                width="16"
                height="16"
              />
            </button>
            <button class="btn btn-delete task__delete">
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
import draggable from "vuedraggable";
import InlineSvg from "vue-inline-svg";

export default {
  components: {
    draggable,
    InlineSvg,
  },
  data() {
    return {
      list: [
        { name: "11111111111111", text: "", id: 0 },
        { name: "22222222222222", text: "", id: 1 },
        { name: "33333333333333", text: "", id: 2 },
        { name: "44444444444444", text: "", id: 3 },
        { name: "55555555555555", text: "", id: 4 },
        { name: "66666666666666", text: "", id: 5 },
      ],
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
  }

  &__input {
    border: none;
    pointer-events: none;
    flex-grow: 1;
    margin-right: 15px;
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