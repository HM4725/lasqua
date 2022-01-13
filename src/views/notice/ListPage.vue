<template>
  <div>
    <router-button link="/notice/write" value="공지사항 작성"/>
  </div>
</template>

<script>
import RouterButton from '@/components/buttons/RouterButton.vue'

export default{
  name: 'notice.listPage',
  components: {
    RouterButton
  }
}
</script>

<style scoped>

</style>