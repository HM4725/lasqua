<template>
  <div class="card">
    <img-component class="card-img"/>
    <div class="card-body">
      설명
    </div>
  </div>
</template>

<script>
import ImgComponent from './ImgComponent.vue'

export default{
  components: {
    ImgComponent
  }
}
</script>

<style scoped>
  .card {
    border: 1px solid var(--base-color);
    border-radius: .25rem;
    word-wrap: break-word;
    transition: all .25s ease-in-out;
  }
  .card > .card-img {
    border-top-left-radius: calc(0.25rem - 1px);
    border-top-right-radius: calc(0.25rem - 1px);
  }
  .card:hover,
  .card:focus {
    border-color: var(--active-color);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    color: var(--active-color);
  }
  .card:hover {
    transform: translateY(-1px);
  }
  .card:active {
    background-color: var(--active-bg-color);
    border-color: var(--active-color);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    color: var(--active-color);
    transform: translateY(0);
  }
  .card:hover > .card-img,
  .card:active > .card-img {
    opacity: 0.7;
  }
</style>