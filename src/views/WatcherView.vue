<template>
  <div class="test-box">
    {{msg}}
  </div>
</template>

<script>
export default{
  data() {
    return {
      msg: "아직 응답을 받지 못했습니다."
    }
  },
  methods: {
    async getMsg() {
      let path = "/api/HelloWorld"
      this.msg = await this.$api(path, "get")
    }
  },
  created() {
    this.getMsg()
  }
}
</script>

<style scoped>
.test-box {
  width: 10rem;
  height: 10rem;
  background-color: blanchedalmond;
}
</style>