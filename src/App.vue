<template>
    <div id="app">
        <loading :active.sync="isLoading"></loading>
        <router-view/>
    </div>
</template>

<script>
export default {
    computed: {
        isLoading() {
            return this.$store.state.isLoading;
        }
    }
}
</script>

<style lang="scss">
@import './assets/scss/all.scss';
</style>
