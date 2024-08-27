<template>
  <div class="todo__cards cards">
    <div class="cards__item">
      <p class="cards__number">{{ completedTasks }} tasks</p>
      <p class="cards__text">Completed</p>
      <div class="cards__progress">
        <div
          class="cards__progress-inner cards__progress-inner--purple"
          :style="{ width: progressWidth + '%' }"
        />
      </div>
    </div>

    <div class="cards__item">
      <p class="cards__number">{{ tasks.length - completedTasks }} tasks</p>
      <p class="cards__text">To be finished</p>
      <div class="cards__progress">
        <div
          class="cards__progress-inner cards__progress-inner--pink"
          :style="{ width: (100 - progressWidth) + '%' }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const tasks = computed(() => store.getters.getTasks);
    const completedTasks = computed(() => store.getters.getCompletedTasks);

    const progressWidth = computed(() => {
      if (tasks.value.length === 0) return 0;
      return (completedTasks.value / tasks.value.length) * 100;
    });

    return {
      tasks,
      completedTasks,
      progressWidth,
    };
  },
};
</script>

<style lang="scss" scoped>
.cards {
  display: flex;
  gap: 32px;
  margin: 40px 0;

  &__item {
    display: flex;
    flex-direction: column;

    width: 200px;

    padding: 10px 15px;
    background-color: rgba($color-black, 5%);
    border-radius: 10px;
  }

  &__number {
    font-family: $main-font-bold;
    font-size: 12px;
    line-height: 1.2;

    margin-bottom: 8px;

    color: $color-grey;
  }

  &__text {
    font-family: $main-font-black;
    font-size: 14px;
    line-height: 1.2;

    margin-bottom: 25px;

    color: $color-black;
  }

  &__progress {
    width: 100%;
    height: 4px;
    background-color: rgba($color-black, 0.3);
    border-radius: 8px;
  }

  &__progress-inner {
    width: 30%;
    height: 100%;
    border-radius: 8px;
		transition: width 0.2s ease;

    &--purple {
      background-color: $color-purple;
    }

    &--pink {
      background-color: $color-pink;
    }
  }
}

</style>

