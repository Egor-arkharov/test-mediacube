<template>
  <section class="todo wrapper">
    <p class="todo__title">Today I&nbsp;need&nbsp;to</p>
    <p class="todo__check">Congrat, you have no&nbsp;more tasks to&nbsp;do</p>
  </section>
</template>

<style lang="scss" scoped>
  .wrapper {
    --decor-size: 10vw;
    --py: 25px;

    position: relative;

    width: 50%;
    height: 80svh;

    color: $color-black;
    background-color: $color-white;
    border-radius: 24px;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: calc(var(--py) + var(--decor-size) + 50px);
    padding-bottom: var(--py);

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
  }

  .todo {
    &__title {
      font-family: $main-font-black;
      font-size: 24px;
      line-height: 1.2;
      color: $color-black;
    }

    &__check {
      position: relative;

      font-family: $main-font;
      font-size: 14px;
      line-height: 1.2;

      padding-left: 29px;
      margin-top: auto;

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
  }
</style>

