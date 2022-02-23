<template>
  <div>
    <label :for="id">
      <slot></slot>
    </label>
    <input type="file" :id="id" accept="image/*"
      @change="upload"/>
  </div>
</template>

<script>
export default{
  name: 'components.form.file.slot',
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