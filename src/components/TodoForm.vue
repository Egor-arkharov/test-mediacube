<template>
  <form
    class="todo__form form"
    @submit.prevent="submitTask"
  >
    <input 
      v-model="newTask"
      class="form__input" 
      type="text" 
      placeholder="Add new todo..."
      @focus="inputFocus = true"
      @blur="hideButtonWithDelay"
    >
    <button
      v-if="inputFocus"
      :disabled="!isValidTask"
      class="form__button btn"
    >
      Submit
    </button>
    <p
      v-if="inputFocus && newTask.length > 0 && !isValidTask"
      class="form__error"
    >
      Please enter at&nbsp;least 3&nbsp;characters including letters or&nbsp;numbers.
    </p>
  </form>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const newTask = ref('');
    const inputFocus = ref(false);

    const isValidTask = computed(() => {
      const trimmedTask = newTask.value.trim();
      return (
        trimmedTask.length > 3 && 
        /[a-zA-Z0-9]/.test(trimmedTask)
      );
    });

    const submitTask = () => {
      if (newTask.value.trim()) {
        store.dispatch('addTask', {
          name: newTask.value,
          id: Date.now(),
        });
        newTask.value = '';
      }
    };

    const hideButtonWithDelay = () => {
      setTimeout(() => {
        inputFocus.value = false;
      }, 100);
    };

    return { 
      newTask, 
      inputFocus,
      isValidTask,
      submitTask,
      hideButtonWithDelay
    };
  },
};
</script>

<style lang="scss" scoped>
.form {
  position: relative;

  display: flex;
  justify-content: space-between;
  gap: 16px;

  width: 100%;
  height: 50px;
  margin-bottom: 60px;

  &__input {
    font-family: $main-font;

    width: 100%;
    padding: 10px 15px;

    color: $color-black;
    border: 2px solid $color-grey-2;
    border-radius: 10px;
    outline: none;

    &::placeholder {
      color: $color-grey;
    }
  }

  &__button {
    font-family: $main-font-bold;
    font-size: 13px;
    line-height: 1.2;

    padding: 15px;

    color: $color-white;
    background-color: $color-blue;
    border: 2px solid $color-blue;
    border-radius: 10px;

    transition: all 0.2s ease;

    @include hover {
      background-color: darken($color-blue, 20%);
      border-color: darken($color-blue, 20%);
    }

    &:focus,
    &:active {
      color: $color-blue;
      background-color: $color-white;
      border-color: $color-blue;
    }

    &:disabled {
      pointer-events: none;
      opacity: 0.3;
    }
  }

  &__error {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;

    font-family: $main-font-bold;
    font-size: clamp(10px, 2vw, 12px);
    color: red;
  }

  @media (max-width: #{map-get($breakpoints, 'xs')}) {
    margin-bottom: 20px;
  }
}
</style>

