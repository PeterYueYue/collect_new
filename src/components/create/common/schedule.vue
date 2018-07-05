<template>
  <ul class="schedule">
    <li v-for="(item,index) in pointLength " :key="item.id" :class="{active :  index == fn1()}"></li>
  </ul>
</template>
<script>
  import {mapGetters} from 'vuex'

  import '@/assets/createstyle/schedule.css'
  export default {
    data() {
      return {
        pointLength: 4
      }
    },
    methods: {
      fn1() {
        return this.$route.params.index - 1
      }
    },
    watch: {
      '$route': 'fn1'
    }
  }

</script>


