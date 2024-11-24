<template>
    <div class="textbox-container">
      <label :for="id" class="textbox-label">{{ label }}</label>
      <input
        :type="type"
        :id="id"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        class="textbox-input"
        :class="{ 'has-error': error }"
      />
      <span v-if="error" class="textbox-error">{{ error }}</span>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  
  // Define props for reusability
  defineProps({
    modelValue: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    error: {
      type: String,
      default: "",
    },
  });
  </script>
  
  <style scoped>
  .textbox-container {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
  }
  
  .textbox-label {
    margin-bottom: 5px;
    font-weight: bold;
    text-align: left;
  }
  
  .textbox-input {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .textbox-input.has-error {
    border-color: red;
  }
  
  .textbox-error {
    color: red;
    font-size: 0.875rem;
    margin-top: 5px;
  }
  </style>
  