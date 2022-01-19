<template>
  <tr @click="handleClick">
    <td class="record-no">{{no}}</td>
    <td class="record-title">{{title}}</td>
  </tr>
</template>

<script>
export default{
  name: 'table.record',
  props: {
    no: Number,
    title: String
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
  }
  tr:hover, tr:active {
    background: var(--active-bg-color);
    color: var(--active-color);
  }
  td {
    border: 1px solid var(--base-color);
  }
  tr > td.record-no {
    width: 10%;
  }
  tr > td.record-title {
    width: 100%;
  }
</style>