<template>
  <label for="input-file">
    <slot></slot>
  </label>
  <input type="file" id="input-file" ref="file" @change="upload"/>
</template>

<script>
export default{
  emits: [
    'upload'
  ],
  methods: {
    getValue() {
      return this.$refs.file
    },
    upload(e) {
      if(e.target.files[0]) {
        const formData = new FormData()
        formData.append("image", e.target.files[0])
        this.$emit("upload", formData)
      }
    }
  }
}
</script>

<style scoped>
  #input-file {
    display: none;
  }
</style>