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
    >
    <button
      class="form__button btn"
    >
      Submit
    </button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const newTask = ref('');

    const submitTask = () => {
      if (newTask.value.trim()) {
        console.log(newTask.value);

        store.dispatch('addTask', {
          name: newTask.value,
          id: Date.now(),
        });
        newTask.value = '';
      }
    };

    return { newTask, submitTask };
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 50px;

  &__input {
    font-family: $main-font;

    width: 30vw;
    max-width: 300px;
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
  }
}
</style>

