<template>
    <div>
        <div class="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb border-bottom">
                    <li class="breadcrumb-item h6"><router-link to="/">首頁</router-link></li>
                    <li class="breadcrumb-item active h6" aria-current="page">完成訂單 & 付款</li>
                </ol>
            </nav>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-8 mx-auto">
                    <div>
                        <div class="text-center" v-if="order.ispaid">
                            <h2>感謝惠顧!</h2>
                            <p class="text-secondary">你的付款已完成</p>
                        </div>
                        <h2 class="text-center" v-if="!order.ispaid">訂單已建立</h2>
                        <p class="text-center text-secondary">訂單編號為
                            <span class="border px-1" id="copyText" @click="copyOrderid" data-trigger="hover" data-toggle="popover" data-content="點擊複製" style="cursor:pointer">{{orderId}}</span>
                        </p>
                        <table class="table">
                            <tr class="bg-dark text-light">
                                <th class="border-top-0">品項</th>
                                <th class="border-top-0">數量</th>
                                <th class="border-top-0 text-right">金額</th>
                            </tr>
                            <tr v-for="item in order.cart" :key="item.cartId">
                                <td>{{ item.product.title }}</td>
                                <td>{{ item.qty }}{{ item.product.unit }}</td>
                                <td class="text-right">${{ item.qty * item.product.price }}</td>
                            </tr>
                            <tr>
                                <td colspan="2">總計</td>
                                <td class="text-danger font-weight-bold text-right">${{ order.total }}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="mt-5">
                        <h2 class="text-center mb-3">購買者資訊</h2>
                        <table class="table" v-if="order.user">
                            <tr>
                                <th class="border-top-0">Email</th>
                                <td class="border-top-0">{{ order.user.email }}</td>
                            </tr>
                            <tr>
                                <th>收件人姓名</th>
                                <td>{{ order.user.name }}</td>
                            </tr>
                            <tr>
                                <th>收件人電話</th>
                                <td>{{ order.user.phone }}</td>
                            </tr>
                            <tr>
                                <th>收件人地址</th>
                                <td>{{ order.user.address }}</td>
                            </tr>
                            <tr>
                                <th>付款狀態</th>
                                <td>
                                    <span class="font-weight-bold text-success" v-if="order.ispaid">已付款</span>
                                    <span class="font-weight-bold text-danger" v-else>尚未付款</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="clearfix mb-5">
                        <button class="btn btn-danger btn-block float-right" @click="topaid(orderId)" v-if="!order.ispaid">確認付款去</button>
                        <button class="btn btn-warning btn-block text-light" @click="toProducts" v-if="order.ispaid">繼續逛逛</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import {fb} from '../../firebase'
const db = fb.firestore();

export default {
    data() {
        return {
            orderId: "",
            order: {}
        }
    },
    methods: {
        topaid(id) {
            const vm = this;
            vm.$store.commit('LOADING', true);
            vm.order.ispaid = true;
            db.collection('orders').doc(id).set(vm.order).then((doc) => {
                vm.$store.commit('LOADING', false);
                vm.getOrder(id);
                window.scrollTo(0, 0);
            })
            .catch((error) => {
                vm.$store.commit('LOADING', false);
                console.error("Error adding document: ", error);
            });
        },
        getOrder(id) {
            this.$store.commit('LOADING', true);
            const vm = this;
            db.collection('orders').doc(id).get()
            .then((doc) => {
                vm.order = Object.assign({}, doc.data());
                vm.$store.commit('LOADING', false);

            })
            .catch(function(error) {
                vm.$store.commit('LOADING', false);
                console.error("Error adding document: ", error);
            });
        },
        toProducts() {
            this.$router.push('/products');
        },
        copyOrderid(e) {          
            let TextRange = document.createRange();
            TextRange.selectNode(document.getElementById('copyText'));
            let sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(TextRange);

            document.execCommand("copy");
            this.$store.dispatch('updateMessage', {message: '已複製訂單編號', status: 'success'});
        }
    },
    created() {
        this.orderId = this.$route.params.orderId;
        this.getOrder(this.orderId);
    },
    mounted() {
        $(function () {
            $('[data-toggle="popover"]').popover()
        })
    }
}
</script>