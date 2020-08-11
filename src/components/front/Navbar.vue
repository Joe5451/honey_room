<template>
    <div>
        <nav class="bg-dark navbar">
            <div class="container">
                <router-link to="/" class="navbar-brand">
                    <i class="fas fa-cookie-bite"></i>
                    Honey Room
                </router-link>

                <div class="nav-toggle">
                    <label for="navbar-nav-toggle" class="mb-0 h4">
                        <i class="fas fa-bars text-light"></i>
                    </label>
                </div>  
                <input type="checkbox" id="navbar-nav-toggle" class="d-none">
               
                    <ul class="navbar-nav d-flex">
                        <li class="nav-item">
                            <router-link to="/">首頁</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/about">關於我們</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/products" @click.native="changeActive">商品</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/signin">
                                <i class="fas fa-user-cog"></i>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/checkout">
                                <i class="fas fa-shopping-cart"></i>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <div class="collect">
                                <i class="fas fa-heart text-danger"></i>
                            </div>
                        </li>
                    </ul>
            </div>
        </nav>
        <Alert />
    </div>
</template>

<script>
import Alert from '../../components/AlertMessage'

export default {
    components: {
        Alert
    },
    methods: {
        changeActive() {
            this.$store.state.active = '';
        }
    }
}
</script>