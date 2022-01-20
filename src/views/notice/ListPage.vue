<template>
  <section class="notice-list-page">
    <h1>공지사항</h1>
    <div class="buttons" v-if="isAdmin">
      <router-button link="/notice/write" value="공지사항 작성"/>
    </div>
    <notice-table/>
  </section>
</template>

<script>
import RouterButton from '@/components/buttons/RouterButton.vue'
import NoticeTable from '@/components/notice/NoticeTable.vue'

export default{
  name: 'notice.list.page',
  components: {
    RouterButton,
    NoticeTable
  },
  data() {
    return {
      isAdmin: false
    }
  },
  created() {
    this.$store.getters.userRole === 'admin' && (this.isAdmin = true)
  }
}
</script>

<style scoped>
  section.notice-list-page {
    width: 100%;
    padding: 1rem 3rem;
  }
  section.notice-list-page > div.buttons {
    text-align: right;
  }
</style>