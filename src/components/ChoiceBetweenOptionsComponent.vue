<template>
  <span class="between-options">
    <svg>
      <line x1="0" y1="0" x2="100%" y2="100%" :stroke="color"/>
      <line x1="0" y1="100%" x2="100%" y2="0" :stroke="color"/>
    </svg>
  </span>
</template>

<script>
export default{
  data() {
    return {
      color: '#333333'
    }
  }
}
</script>

<style scoped>
.between-options > svg {
    width: 12rem;
    height: 12rem;
}
@media (max-width: 767px) {
  .between-options {
    display: none;
  }
}
</style>