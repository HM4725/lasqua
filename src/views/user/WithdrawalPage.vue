<template>
  <form class="withdrawal-page" @submit.prevent="submit" method="POST">
    <h1>탈퇴안내</h1>
    <p class="context">회원탈퇴를 신청하기 전에 안내 사항을 꼭 확인해주세요.</p>
    <!-- 확인 후 수정할 것 -->
    <ul>
      <li>
        <p>사용하고 계신 아이디(<em>{{id}}</em>)는 탈퇴할 경우, 재사용 및 복구가 불가능합니다.</p>
      </li>
      <li>
        <p>탈퇴 후, 회원정보와 게시물은 모두 삭제됩니다.</p>
      </li>
    </ul>
    <div class="agree-area">
      <p>
        탈퇴 후에는 아이디 <em>{{id}}</em> 로 다시 가입할 수 없으며<br>
        아이디와 게시글은 복구할 수 없습니다.
      </p>
      <check-box id="agree-withdrawal" value="안내 사항을 모두 확인하였으며, 이에 동의합니다."
        @checked="v=>agreement=v"/>
    </div>
    <footer>
      <default-button class="button" value="취소" @click="cancel"/>
      <default-button class="button" type="submit" value="탈퇴"/>
    </footer>
  </form>
</template>

<script>
import DefaultButton from '@/components/buttons/DefaultButton.vue'
import CheckBox from '@/components/form/CheckBox.vue'

export default{
  name: 'user.withdrawal.page',
  components: {
    DefaultButton,
    CheckBox
  },
  props: {
    valid: {
      type: String,
      default: 'false'
    }
  },
  data() {
    return {
      id: '',
      agreement: false
    }
  },
  methods: {
    async submit() {
      if(this.agreement) {
        if(await this.$store.dispatch('withdrawal')) {
          this.$processMessenger('정상적으로 탈퇴되었습니다.', '/')
        } else {
          alert('오류가 발생하였습니다.')
        }
      } else {
        alert('탈퇴 안내를 확인하고 동의해 주세요.')
      }
    },
    cancel() {
      this.$router.push(`/artist/${this.$store.getters.userId}`)
    },
  },
  created() {
    if(this.valid !== 'true') {
      this.$router.push({name: 'user.pwauth', params: {page: 'user.withdrawal'}})
    } else {
      this.id = this.$store.getters.userId
    }
  }
}
</script>

<style scoped>
  .withdrawal-page {
    display: flex;
    flex-direction: column;
    margin: auto;
  }
  .withdrawal-page p {
    text-align: left;
  }
  .withdrawal-page li {
    margin-bottom: 16px;
  }
  .withdrawal-page em {
    color: #390;
    font-style: normal;
  }
  .withdrawal-page > p.context {
    font-size: .8rem;
    color: #333;
  }
  .withdrawal-page > .agree-area > p {
    color: red;
    font-weight: bold;
    padding-bottom: 32px;
  }
  .withdrawal-page > footer {
    text-align: right;
    padding: 16px 0;
  }
  .withdrawal-page > footer .button {
    margin-left: 16px;
  }
</style>