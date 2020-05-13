<template>
  <div class="example">
    {{message}}
  </div>
</template>
<style lang="less">
  html, body {
    height: 100%;
  }
  .example {
    width: 100%;
    height: 100%;
    background: orange;
  }
</style>
<script>
export default {
  data() {
    return {
      message: 'test123'
    }
  }
}
</script>