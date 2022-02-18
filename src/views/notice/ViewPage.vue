<template>
  <article class="view-page">
    <h1>{{title}}</h1>
    <dl>
      <dt>등록일</dt>
      <dd>{{regdate}}</dd>
    </dl>
    <notice-content :content="content"/>
    <footer>
      <default-button class="button" value="목록" @click="backToList"/>
      <default-button class="button" value="삭제" @click="deleteNotice" v-if="isAdmin"/>
      <default-button class="button" value="수정" @click="modifyNotice" v-if="isAdmin"/>
    </footer>
  </article>
</template>

<script>
import NoticeContent from '@/components/notice/NoticeContent.vue'
import DefaultButton from '@/components/buttons/DefaultButton.vue'

export default{
  name: 'notice.view.page',
  components: {
    NoticeContent,
    DefaultButton
  },
  data() {
    return {
      no: 0,
      title: '',
      content: '',
      regdate: '',
      isAdmin: false
    }
  },
  methods: {
    // Event API
    backToList() {
      this.$router.push('/notice')
    },
    modifyNotice() {
      this.$router.push({name: 'notice.modify', params: {data: JSON.stringify(this.$data)}})
    },
    async deleteNotice() {
      try {
        await this.$api('DELETE', `/notice/${this.no}`)
        this.$router.push('/notice')
      } catch(error) {
        console.error(error)
      }
    },
    // Load Method
    async loadNotice(no) {
      try {
        const response = await this.$api('GET', `/notice?no=${no}`)
        const data = response.data
        this.title = data.title
        this.content = data.content
        this.regdate = data.regdate
      } catch(error) {
        console.error(error)
      }
    }
  },
  created() {
    this.no = this.$route.query.no
    this.loadNotice(this.no)
    this.$store.getters.userRole === 'admin' && (this.isAdmin = true)
  }
}
</script>

<style scoped>
  article.view-page {
    width: 100%;
    padding: 24px;
    text-align: left;
  }
  footer {
    text-align: right;
    padding: 16px 0;
  }
  footer > .button {
    margin-left: 16px;
  }
  @media (max-width: 767px) {
    article.view-page {
      padding: var(--mobile-padding-size);
    }
  }
</style>