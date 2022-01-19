<template>
  <section>
    <header>
      <router-button link="/notice/write" value="공지사항 작성"/>
    </header>
    <notice-table/>
  </section>
</template>

<script>
import RouterButton from '@/components/buttons/RouterButton.vue'
import NoticeTable from '@/components/notice/NoticeTable.vue'

export default{
  name: 'notice.listPage',
  components: {
    RouterButton,
    NoticeTable
  }
}
</script>

<style scoped>
  section {
    width: 100%;
    padding: 3rem;
  }
  section > header {
    text-align: right;
  }
</style>