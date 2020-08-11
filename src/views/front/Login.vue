<template>
    <div class="login">
        <div class="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb border-bottom">
                    <li class="breadcrumb-item h6"><router-link to="/">首頁</router-link></li>
                    <li class="breadcrumb-item active h6" aria-current="page">管理員登入</li>
                </ol>
            </nav>
        </div>
        <div class="container">
            <div class="row">
                <form class="form-signin d-flex flex-column mx-auto" @submit.prevent="pressed">
                    <h3 class="title mb-4">請登入管理員帳號</h3>
                    <input type="email" class="form-control  mb-2" placeholder="Email address" spellcheck="false" required v-model="user.email">
                    <input type="password" class="form-control mb-3" placeholder="Password" required v-model="user.password">
                    <button type="submit" class="rounded border-0 bg-warning">Sign in</button>
                </form>
                <!-- <div v-if="error">{{error}}</div> -->
            </div>
        </div>
    </div>
</template>

<script>
    import { fb } from '../../firebase';
    import 'firebase/auth';

    export default {
        created() {
            const isAuthenticated = fb.auth().currentUser;
            if(isAuthenticated) {
                this.$router.replace('/admin/products');
            }
        },
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                    // error: ''
                }
            }
        },
        methods: {
            async pressed() {              
                const val = fb.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then(() => {
                    // console.log(val);
                    this.$router.push('/admin/products');
                }).catch(function(error) {
                    console.log(error.message);
                    alert('輸入錯誤帳號密碼!!');
                });
                
            }
        }
    }
</script>