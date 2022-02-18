<template>
  <div class="error-page">
    <p>{{warning}}</p>
    <default-button value="뒤로 돌아가기" @click="handleClick"/>
  </div>
</template>

<script>
import DefaultButton from '@/components/buttons/DefaultButton.vue'

export default{
  name: 'utils.error.page',
  components: {
    DefaultButton
  },
  data() {
    return {
      warning: '잘못된 접근입니다.'
    }
  },
  methods: {
    handleClick() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .error-page > p {
    margin-bottom: 24px;
  }
  @media (max-width: 767px) {
    .error-page {
      padding: var(--mobile-padding-size);
    }
  }
</style>