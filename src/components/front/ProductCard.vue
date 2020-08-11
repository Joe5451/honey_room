<template>
    <div>
        <router-link :to="`/products/${product.productId}`" class="product-card d-block shadow">
            <div class="card border-0 bg-light">
                <div class="img-container rounded-lg overflow-hidden">
                    <img :src="product.imgURL" alt="product">
                </div>
                <div class="card-body">
                    <h6 class="card-subtitle text-secondary">{{ product.category }}</h6>
                    <h5 class="card-title">{{ product.title }}</h5>
                    <div class="card-price">$ {{ product.price }}</div>
                </div>
                <button class="btn btn-danger" @click.prevent="addtoCart(product.productId, product, 1)">加入購物車</button>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['product'],
    methods: {
        addtoCart(id, product, qty) {
            this.$store.dispatch('addtoCart', {id, product, qty});
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/functions";
@import "../../assets/scss/helpers/_variables";

.product-card {
    .img-container {
        width: 100%;
        height: 0;
        padding-bottom: 66.67%;
        position: relative;
        overflow: hidden;
        &:after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            content: '點擊查看更多';
            display: flex;
            justify-content: center;
            align-items: center;
            color: $light;
            background: rgba(0,0,0,.4);
            font-size: 20px;
            opacity: 0;
            transition: all 0.2s;
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

    .card-body {
        color: $dark;
    }

    .btn {
        opacity: 0;
        transition: all 0.3s;

        @media (max-width: 1200px) {
            opacity: 1;
        }
    }

    &:hover {
        .card {
            .img-container {
                &:after {
                    opacity: 1;
                }
                img {
                    transform: scale(1.2);
                }
            }
            .btn {
                opacity: 1;
            }
        }
    }
}
</style>