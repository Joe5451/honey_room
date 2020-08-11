<template>
    <div>
        <div class="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb border-bottom">
                    <li class="breadcrumb-item h6"><router-link to="/">首頁</router-link></li>
                    <li class="breadcrumb-item active h6" aria-current="page">商品</li>
                </ol>
            </nav>
            <div class="row">
                <div class="col-md-3">
                    <ul class="categories-list position-sticky mb-4 mb-md-0 px-2 px-md-0" style="top: 16px">
                        <li class="categories-list-item active" @click="function(e){changeActive('')}">所有商品</li>
                        <li class="categories-list-item" @click="function(e){changeActive(e.currentTarget.innerHTML)}">新品上市</li>
                        <li class="categories-list-item" @click="function(e){changeActive(e.currentTarget.innerHTML)}">人氣商品</li>
                        <li class="categories-list-item" @click="function(e){changeActive(e.currentTarget.innerHTML)}">本日精選</li>
                    </ul>
                </div>
                <div class="col-md-9">
                    <div class="row">
                        <ProductCard class="col-md-6 col-lg-4" style="margin-bottom: 30px;" v-for="product in showProducts" :product="product" :key="product.productId" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductCard from '../../components/front/ProductCard'

export default {
    components: {
        ProductCard
    },
    computed: {
        products() {
            return this.$store.state.cusProducts;
        },
        showProducts() {
            const active = this.$store.state.active;
            const categoriesItem = document.querySelectorAll('.categories-list-item');
            categoriesItem.forEach(item => {
                item.classList.remove('active');
                if (item.innerHTML == active || (active == '' && item.innerHTML == '所有商品')) {
                    item.classList.add('active');
                }
            });

            if (window.innerWidth >= 768) window.scrollTo(0, 0); //當要顯示的資料有變時網頁移到最上面，且在 768px 以上作用

            return this.products.filter(item => {
                return item.category.indexOf(active) > -1;
            })
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
        this.changeActive(this.$store.state.active);
    }
}
</script>