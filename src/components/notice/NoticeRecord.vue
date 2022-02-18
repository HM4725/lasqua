<template>
  <tr @click="handleClick">
    <td class="record-title">{{title}}</td>
    <td class="record-regdate">{{regdate}}</td>
  </tr>
</template>

<script>
export default{
  name: 'components.notice.record',
  props: {
    no: Number,
    title: String,
    regdate: String
  },
  methods: {
    handleClick() {
      this.$router.push(`/notice/view?no=${this.no}`)
    }
  }
}
</script>

<style scoped>
  tr {
    width: 100%;
    transition: all .25s ease-out;
    line-height: 2.5;
    cursor: pointer;
    border-bottom: 1px solid var(--base-color);
  }
  tr:hover, tr:active {
    background: var(--active-bg-color);
    color: var(--active-color);
  }
  td.record-title {
    padding: 0 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  td.record-regdate {
    width: 200px;
  }
  @media (max-width: 767px) {
    td.record-regdate {
      width: 100px;
    }
  }
</style>