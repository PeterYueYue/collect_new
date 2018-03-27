<template>
  <div class="container">
      <div class="nav">导航</div>
      <div class="main">
          <div>silder</div>
          <div>content</div>
      </div>
  </div>
</template>
<style>
html, body, #app{
    height: 100%;
}
.container{
    height: 100%;
    display: flex;
    flex-direction: column;
}
.main{
    flex-grow: 1;
    display: flex;
}
</style>

