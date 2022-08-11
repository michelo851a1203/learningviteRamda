<script setup lang="ts">
import { ref } from 'vue';
import { useTestSampleStore } from './store/testSample';
const {
  integrateGetTestSampleListHandler,
  integrateGetTestSampleDetailHandler,
} = useTestSampleStore()
const currentInput = ref('');

const getAllTestSampleListListener = async () => {
  const result = await integrateGetTestSampleListHandler()
  console.log(result);
}

const getTestSampleDetailListener = async () => {
  const result = await integrateGetTestSampleDetailHandler(currentInput.value)
  console.log(result);
}
</script>

<template>
<div>
  <button 
    @click="getAllTestSampleListListener"
    class="px-3 py-2 rounded-xl bg-blue-300 border-none"
  >
    get all Sample list
  </button>
</div>
<div>
<input 
  class="border border-gray-200 px-3 py-2 rounded-md space-x-4"
  v-model="currentInput" 
  type="text"
>
  <button 
    @click="getTestSampleDetailListener"
    class="px-3 py-2 rounded-xl bg-blue-300 border-none"
  >
    get all Sample Detail
  </button>
</div>
</template>

<style scoped></style>
