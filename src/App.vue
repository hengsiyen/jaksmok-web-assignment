<template>
  <div id="app">
    <nav class="text-center p-4">
      <router-link to="/" class="h3 text-decoration-none">Home</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap');
#app {
  font-family: 'Rubik', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.vh-65 {
    height: 65vh;
}
</style>
