<template>
  <div class="findid-page">
    <h1>아이디 찾기 결과</h1>
    <template v-if="init">
      <div v-if="id">
        <p class="message">
          해당 이메일 (<em>{{email}}</em>) 로 찾은 아이디입니다.<br v-if="!$isMobile()">
          개인정보 보호를 위해 아이디의 일부는 *로 표기됩니다.
        </p>
        <div class="findid-result">
          <span>{{id}}</span>
        </div>
      </div>
      <div v-else>
        <p class="message">
          해당 이메일 (<em>{{email}}</em>) 로 가입한 아이디가 없습니다.<br v-if="!$isMobile()">
          회원가입 후 이용바랍니다.
        </p>
      </div>
      <footer>
        <router-button class="button" :value="button.value" :link="button.link"/>
      </footer>
    </template>
  </div>
</template>

<script>
import RouterButton from '@/components/buttons/RouterButton.vue'

export default{
  name: 'user.findid.page2',
  components: {
    RouterButton
  },
  props: {
    auth: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      id: '',
      init: false,
      button: {
        value: '',
        link: ''
      }
    }
  },
  methods: {
    async findId() {
      try {
        // Id가 있는 경우
        const response = await this.$api('POST', `/id/${this.auth}`, 
          {email: this.email})
        this.id = response.data.id
        this.button.value = '로그인'
        this.button.link = '/login'
      } catch(error) {
        // Id가 없는 경우
        this.button.value = '회원가입'
        this.button.link = '/signup'
      }
      this.init = true
    }
  },
  created() {
    if(this.auth === '' || this.email === '') {
      this.$handleWrongAccess('/')
    } else {
      this.findId()
    }
  }
}
</script>

<style scoped>
  p.message {
    text-align: left;
  }
  .findid-result {
    border: 1px solid var(--active-color);
    margin: 16px 8px;
    padding: 16px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }
  .findid-page em {
    color: #390;
    font-style: normal;
  }
  .findid-page > footer {
    text-align: right;
    padding: 16px 0;
  }
  .findid-page > footer > .button {
    margin-right: 16px;
  }
  @media (max-width: 767px) {
    .findid-page {
      padding: var(--mobile-padding-size);
    }
  }
</style>