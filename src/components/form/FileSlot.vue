<template>
  <label :for="id">
    <slot></slot>
  </label>
  <input type="file" :id="id" ref="file" @change="upload"/>
</template>

<script>
export default{
  emits: [
    'upload'
  ],
  props: {
    id: {
      type: String,
      default: 'input-file'
    }
  },
  methods: {
    getValue() {
      return this.$refs.file
    },
    upload(e) {
      if(e.target.files[0]) {
        const formData = new FormData()
        formData.append("file", e.target.files[0])
        this.$emit("upload", formData)
        e.target.value = ''
      }
    }
  }
}
</script>

<style scoped>
  input[type=file] {
    display: none;
  }
</style>