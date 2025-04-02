<template>
  <div style="position: absolute" />
</template>

<script>
  export default {
    mounted () {
      this.$socketio.connect()
    },

    destroyed () {
      if (this.$store.state.forcedLogout) {
        this.$socketio.clientDisconnect()
      }
    },
  }
</script>
