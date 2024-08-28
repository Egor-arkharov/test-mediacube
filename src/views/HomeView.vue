<template>
  <section class="todo wrapper">
    <div class="todo__inner">
      <p class="todo__title">Today I&nbsp;need&nbsp;to</p>

      <todo-form />
      <todo-list />

      <todo-cards v-if="tasks.length !== 0" />
      <todo-tools v-if="tasks.length !== 0" />

      <p
        v-if="tasks.length === 0"
        class="todo__check"
      >
        Congrat, you have no&nbsp;more tasks to&nbsp;do
      </p>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import TodoCards from '../components/TodoCards';
import TodoTools from '../components/TodoTools';

export default {
  components: {
    TodoList,
    TodoForm,
    TodoCards,
    TodoTools
  },
  setup() {
    const store = useStore();
    const tasks = computed(() => store.getters.getTasks);

    const filteredTasks = computed(() => store.getters.getFilteredTasks);

    return {
      tasks,
      filteredTasks
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  --decor-size: 10vw;
  --py: 25px;
  --decor-offset: 50px;

  position: relative;

  width: 50%;
  height: 90svh;

  color: $color-black;
  background-color: $color-white;
  border-radius: 24px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: calc(var(--py) + var(--decor-size) + var(--decor-offset));
  padding-bottom: var(--py);
  padding-left: 12px;
  padding-right: 12px;

  &::before {
    content: "";
    position: absolute;

    left: 50%;
    top: var(--py);
    translate: -50% 0;

    width: var(--decor-size);
    height: var(--decor-size);

    background-image: url('@/assets/icons/decor.svg');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }

  @media (max-width: #{map-get($breakpoints, 'lg')}) {
    width: 80%;
  }

  @media (max-width: #{map-get($breakpoints, 'md')}) {
    --decor-offset: 30px;
  }

  @media (max-width: #{map-get($breakpoints, 'xs')}) {
    --decor-size: 20vw;
    width: 95%;
    height: 95svh;
  }
}

.todo {
  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30vw;
    max-width: 400px;
    height: 100%;
  }

  &__title {
    font-family: $main-font-black;
    font-size: clamp(18px, 3vw, 24px);
    line-height: 1.2;
    color: $color-black;
    margin-bottom: 50px;
  }

  &__check {
    position: relative;

    font-family: $main-font;
    font-size: clamp(12px, 3vw, 14px);
    line-height: 1.2;

    padding-left: 29px;
    margin-top: auto;
    margin-bottom: 10px;

    color: $color-grey;

    &::before {
      content: "";
      position: absolute;

      left: 0;
      top: 50%;
      translate: 0 -50%;

      width: 24px;
      height: 24px;

      background-image: url('@/assets/icons/checkmark.svg');
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }

  @media (max-width: #{map-get($breakpoints, 'md')}) {
    &__inner {
      width: 100%;
    }

    &__title {
      margin-bottom: 30px;
    }
  }

  @media (max-width: #{map-get($breakpoints, 'sm')}) {
    &__inner {
      overflow: hidden auto;
      max-width: unset;
    }
  }
}
</style>

