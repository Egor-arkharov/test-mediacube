<template>
  <section class="todo wrapper">
    <p class="todo__title">Today I&nbsp;need&nbsp;to</p>

    <form
      class="todo__form form"
    >
      <input 
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


    <div class="todo__cards cards">
      <div class="cards__item">
        <p class="cards__number">3 tasks</p>
        <p class="cards__text">Completed</p>
        <div class="cards__process" />
      </div>

      <div class="cards__item">
        <p class="cards__number">0 tasks</p>
        <p class="cards__text">To be finished</p>
        <div class="cards__process" />
      </div>
    </div>

    <div class="todo__bullets bullets">
      <button class="bullets__button">Check all</button>
      <button class="bullets__button active">All</button>
      <button class="bullets__button">Active</button>
      <button class="bullets__button">Complited</button>
      <button class="bullets__button">Clear complited</button>
    </div>


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
    margin-bottom: 50px;
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

.form {
  display: flex;
  gap: 16px;
  margin-bottom: 50px;

  &__input {
    font-family: $main-font;

    width: 300px;
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

.cards {
  display: flex;
  gap: 32px;

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

  &__process {

  }
}

.bullets {
  display: flex;
  gap: 16px;
  margin-top: auto;

  &__button {
    font-family: $main-font-bold;
    font-size: 14px;
    line-height: 1.2;

    padding: 15px;
    color: $color-black;

    // background-color: $color-blue;
    // border: 2px solid $color-blue;
    border-radius: 10px;

    // transition: all 0.2s ease;

    &.active {
      color: $color-white;
      background-color: $color-blue;
    }
  }
}
</style>

