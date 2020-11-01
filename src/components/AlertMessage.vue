<template>
    <div class="message-alert">
        <div class="alert alert-dismissible" :class="'alert-' + item.status" v-for="(item, index) in messages" :key="index">
            {{ item.message }}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        messages() {
            return this.$store.state.messages;
        }
    },
    methods: {
        updateMessage(message, status) {
            this.$store.dispatch('updateMessage', {message, status});
        },
        removeMessage(index) {
            this.$store.dispatch('removeMessage', index);
        },
        removeMessageWithTiming(timestamp) {
            this.$store.dispatch('removeMessageWithTiming', timestamp);
        }
    }
}
</script>

<style lang="scss" scoped>
.message-alert {
    position: fixed;
    top: 60px;
    right: 20px;
    z-index: 200;
    opacity: 0.9;
}

.alert-success {
    background: #f89406;
    color: #fff;
}

@media only screen and (max-width: 768px) {
    .message-alert {
        width: calc(100% - 30px);
        top: auto;
        right: auto;
        left: 50%;
        bottom: 20px;
        transform: translateX(-50%);
    }
}
</style>