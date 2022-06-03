<template>
  <div class="add-content">
    <form @submit.prevent="submit" class="add-content-form">
      <input
        class="add-content-form__input"
        type="text"
        placeholder="Title"
        v-model="title"
      />
      <input
        class="add-content-form__input"
        type="text"
        placeholder="Image Link"
        v-model="img"
      />
      <input
        class="add-content-form__input"
        type="text"
        placeholder="Date"
        v-model="date"
      />
      <button class="add-content-form__button">Submit</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const title = ref("");
const img = ref("");
const date = ref("");

const submit = () => {
  console.log("-->", 1);
};
</script>

<style scoped lang="scss">
.add-content {
  margin: 0 auto;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 600px;
}

.add-content-form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.add-content-form__input {
  width: 100%;
  display: block;
  padding: 10px;
  margin-bottom: 10px;
}

.add-content-form__button {
  display: block;
  border: none;
  cursor: pointer;
  background-color: var(--color-4);
  padding: 10px;
  color: var(--color-1);
  font-size: 20px;
}
</style>
