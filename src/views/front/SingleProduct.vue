<template>
    <div>
        <div class="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb border-bottom">
                    <li class="breadcrumb-item h6"><router-link to="/">首頁</router-link></li>
                    <li class="breadcrumb-item h6"><router-link to="/products">商品</router-link></li>
                    <li class="breadcrumb-item active h6" aria-current="page">{{ product.title }}</li>
                </ol>
            </nav>
            <div class="row mb-5">
                <div class="col-md-6 mb-3">
                    <div class="img-container rounded-lg overflow-hidden">
                        <img :src="product.imgURL" alt="product">
                    </div>
                </div>
                <div class="col-md-6">
                    <h2>{{ product.title }}</h2>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="text-muted"><del>原價 ${{ product.origin_price }}</del></span>
                        <span class="h3 text-danger"><strong>售價 ${{ product.price }}</strong></span>
                    </div>
                    <hr>
                    <div>
                        <h4>商品介紹</h4>
                        <p>{{ product.content }}</p>
                    </div>
                    <hr>
                    <div>
                        <div class="form-group d-flex">
                            <select class="form-control col mr-2" v-model="qty">
                                <option value="0" selected="selected" disabled="disabled">請選擇數量</option>
                                <option v-for="n in 10" :key="n" :value="n">選購 {{n}} {{ product.unit }}</option>
                            </select>
                            <button class="btn btn-danger" @click="addtoCart(id, product, qty)">加入購物車</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section class="l-section">
            <h2 class="l-section-title">同系列商品</h2>
            <RecommendSwiper class="px-5 px-md-3" :products="seriesProducts" />
        </section>
    </div>
</template>

<script>
import RecommendSwiper from '../../components/front/RecommendSwiper'
import {fb} from '../../firebase'

const db = fb.firestore();

export default {
    components: {
        RecommendSwiper
    },
    data() {
        return {
            id: '',
            product: {},
            qty: 0
        }
    },
    computed: {
        seriesProducts() {
            const vm = this;
            return this.$store.state.cusProducts.filter(item => {
                return (item.category == vm.product.category) && (item.productId != vm.id);
            })
        },
        cart() {
            return this.$store.state.cart.cart;
        }
    },
    methods: {
        getProduct() {
            const vm = this;
            const store = this.$store;
            const response = {};

            store.commit('LOADING', true);
            db.collection("products").doc(vm.id).get().then(function(doc) {  //只篩選啟用中 using = true 的資料
                vm.product = Object.assign({}, doc.data(), {productId: doc.id});
                store.commit('LOADING', false);
            })
            .catch(function(error) {
                store.commit('LOADING', false);
                console.error("Error adding document: ", error);
                alert('商品資料讀取失敗');
            });
        },
        getCart() {
            this.$store.dispatch('getCart');
        },
        addtoCart(id, product, qty) {
            if (qty <=0 ) {
                this.$store.dispatch('updateMessage', {message: '請選擇數量', status: 'danger'});
                return;
            }
            this.$store.dispatch('addtoCart', {id, product, qty});
        }
    },
    created() {
        this.id = this.$route.params.productId;
        this.getProduct();
        this.$store.dispatch('getCusProducts');
        this.getCart();
    }
}
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/functions";
@import "../../assets/scss/helpers/_variables";

.img-container {
    width: 100%;
    height: 0;
    padding-bottom: 66.67%;
    position: relative;
    overflow: hidden;

    &:hover {
        img {
            transform: scale(1.2);
        }
    }
    
    img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        object-fit: cover;
        transition: all 0.3s;
    }
}
</style>