<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import HelloWorld from '@/components/HelloWorld'
  import adminDashboard from './admin'

  export default {
    name: 'dashboard',
    components: { HelloWorld,adminDashboard },
    data() {
      return {
        currentRole: 'adminDashboard'
      }
    },
    computed: {
      ...mapGetters([
        'roles'
      ])
    },
    created() {
      // if (!this.roles.includes('admin')) {
      //   this.currentRole = 'editorDashboard'
      // }
    }
  }
</script>
