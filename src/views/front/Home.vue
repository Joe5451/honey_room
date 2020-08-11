<template>
    <div>
        <section>
            <BannerSwiper />
        </section>
        <section class="pt-5">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 px-3 mt-3 d-none d-md-block">
                        <DisplaySwiper />   
                    </div>
                    <div class="col-md-6 px-3 mt-3">
                        <div>
                            <h5 class="bg-dark text-light py-3 text-center font-weight-bold">最新消息</h5>
                            <ul class="new-list-group">
                                <li class="new-list-group-item border-bottom px-3 py-2" v-for="n in 10" :key="n">Lorem, ipsum dolor{{n}}.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="l-section">
            <h2 class="l-section-title">商品分類</h2>
            <div>
                <div class="container productCategory-container">
                    <div class="row">
                        <div class="col-md-4 mb-4 mb-md-0">
                            <div class="img-container">
                                <router-link to="/products" @click.native="changeActive('本日精選')">
                                    <img src="../../assets/image/banner1.jpg" alt="product">
                                    <h3>本日精選</h3>
                                </router-link>
                            </div>
                        </div>
                        <div class="col-md-4 mb-4 mb-md-0">
                            <div class="img-container">
                                <router-link to="/products" @click.native="changeActive('新品上市')">
                                    <img src="../../assets/image/banner2.jpg" alt="product">
                                    <h3>新品上市</h3>
                                </router-link>
                            </div>
                        </div>
                        <div class="col-md-4 mb-4 mb-md-0">
                            <div class="img-container">
                                <router-link to="/products" @click.native="changeActive('人氣商品')">
                                    <img src="../../assets/image/banner3.jpg" alt="product">
                                    <h3>人氣商品</h3>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="l-section about">
            <div class="background">
                <div class="container py-5 py-sm-4 text-center">
                    <div class="content-container mx-auto py-3 mb-4">
                        <h4 class="text-center mb-3">不忘初心</h4>
                        <p class="h5 textStyle text-center">
                        我們堅持健康、無添加<br />
                        選用上等材料、新鮮製作<br />
                        給客人最好的體驗
                        </p>
                    </div>
                    <router-link to="/about" class="btn btn-warning shadow-none text-dark">關於哈妮屋</router-link>
                </div>
            </div>
        </section>
        <section class="l-section">
            <h2 class="l-section-title">本店推薦</h2>
            <RecommendSwiper :products="products"/>
        </section>
        <section class="l-section">
            <h2 class="l-section-title">來看看我們的客戶怎麼說</h2>
            <div class="bg-light">
                <div class="container">
                    <div class="row pt-3">
                        <div class="col-md-6 col-lg-4 customer-comment">
                            <img src="../../assets/image/customer1.jpg" alt="customer" width="64px" height="64px">
                            <div class="alert alert-secondary">
                                <h5>Barry Margolyes</h5>
                                <p>難以超越的美味!</p>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 customer-comment">
                            <img src="../../assets/image/customer2.jpg" alt="customer" width="64px" height="64px">
                            <div class="alert alert-secondary">
                                <h5>Jenny Murphy</h5>
                                <p>下午茶第一首選!</p>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 customer-comment">
                            <img src="../../assets/image/customer3.jpg" alt="customer" width="64px" height="64px">
                            <div class="alert alert-secondary">
                                <h5>Julia Vives</h5>
                                <p>百分之百巧克力令人著迷!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import BannerSwiper from '../../components/front/BannerSwiper'
import DisplaySwiper from '../../components/front/DisplaySwiper'
import RecommendSwiper from '../../components/front/RecommendSwiper'

export default {
    components: {
        BannerSwiper,
        DisplaySwiper,
        RecommendSwiper
    },
    computed: {
        products() {
            return this.$store.state.cusProducts;
        }
    },
    methods: {
        changeActive(active) {
            this.$store.state.active = active;
        }
    },
    created() {
        this.$store.dispatch('getCusProducts');
        this.$store.dispatch('getCart');
    },
    mounted() {
        window.scrollTo(0, 0);
    },
}
</script>

