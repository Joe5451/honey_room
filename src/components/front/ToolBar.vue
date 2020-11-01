<template>
    <div class="tool-bar position-fixed">
        <a href="#" class="top-btn rounded-circle">
            Top<i class="fas fa-chevron-up"></i>
        </a>
        <button class="shopping-btn rounded-circle border-light" @click="toggleCart">
            <i class="fas fa-shopping-cart"></i>
        </button>

        <div class="showCart">
            <h3>我的購物車</h3>
            <div v-if="cart.length>0">
                <div class="cart-list my-1 ">
                    <table class="w-100">
                        <thead>
                            <tr>
                                <td>品項</td>
                                <td>數量</td>
                                <td>金額</td>
                                <td>刪除</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in cart" :key="item.product.productId">
                                <td>{{ item.product.title }}</td>
                                <td>{{ item.qty }}{{ item.product.unit }}</td>
                                <td>${{ item.product.price*item.qty }}</td>
                                <td>
                                    <button class="btn text-danger" @click="deleteCart(item.product.productId)">
                                        <i class="far fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="totalPrice my-1">總計: ${{ total }}</div>
                <router-link to="/checkout" class="btn checkout w-100 bg-danger text-light border-0 p-1 my-2">結帳去</router-link> 
            </div>
            <div v-else>
                <div class="noCart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>你的購物車沒有商品喔!</p>
                    <router-link to="/products" @click.native="changeActive('')" class="btn checkout w-100 bg-danger text-light border-0 p-1 my-2">現在就去逛逛</router-link> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        cart () {
            return this.$store.state.cart.cart;
        },
        total() {
            return this.$store.state.cart.total;
        },
    },
    methods: {
        toggleCart () {
            const shoppingBtn = document.querySelector('.shopping-btn');
            const showCart = document.querySelector('.showCart');

            shoppingBtn.classList.toggle('active');
            showCart.classList.toggle('active');
        },
        getCart () {
            this.$store.dispatch('getCart');
        },
        deleteCart (id) {
            this.$store.dispatch('deleteCart', id);
        },
        changeActive(active) {
            this.$store.state.active = active;
        }
    },
    mounted () {
        const topBtn = document.querySelector('.top-btn');

        window.addEventListener('scroll', function() {
            if (window.scrollY > 600) {
                topBtn.classList.add('active');
            } else {
                topBtn.classList.remove('active');
            }
        });
    },
}
</script>

<style lang="scss" scoped>
    .tool-bar {
        bottom: 20px;
        right: 10px;
        z-index: 100;
        display: flex;
        flex-direction: column;

        .top-btn {
            width: 50px;
            height: 50px;
            outline: none;
            background: transparent;
            background: rgba(255,255,255,.9);
            border: 3px solid #000;
            font-size: 12px;
            color: #000;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transform: scale(0);
            opacity: 0.6;
            transition: all 0.3s;

            &:hover {
                opacity: 1;
            }

            &.active {
                transform: scale(1);
            }

            i {
                color: #000;
                font-size: 18px;
            }
        }

        .shopping-btn {
            width: 50px;
            height: 50px;
            margin-top: 20px;
            outline: none;
            background: #dc3545;
            box-shadow: 0 0 2px 2px rgba(0, 0, 0, .5);
            opacity: 0.7;
            transition: opacity 0.3s;

            &.active {
                opacity: 0.9;
            }

            i {
                color: #fff;
                font-size: 24px;
            }
        }

        .showCart {
            background: #fff;
            border: 1px solid #888;
            position: fixed;
            bottom: 80px;
            right: 50px;
            width: 500px;
            padding: 10px 15px;
            text-align: center;
            transform: scale(0);
            transition: 0.5s;

            &.active {
                transform: scale(1);
            }

            @media only screen and (max-width: 768px) {
                & {
                    width: 400px;
                    right: 35px;
                }
            }

            @media only screen and (max-width: 500px) {
                & {
                    width: 311px;
                    right: 4px;
                }
            }

            h3 {
                font-size: 18px;
                font-weight: bold;
                padding: 6px;
            }

            .cart-list {
                height: 240px;
                overflow: overlay;
                &::-webkit-scrollbar {
                    width: 5px;
                    background: transparent;
                }
                
                &::-webkit-scrollbar-track {
                    background: transparent;
                }
                
                &::-webkit-scrollbar-thumb {
                    background: rgba(244,67,54 ,.7); 
                }
                
                &::-webkit-scrollbar-thumb:hover {
                    background: rgba(244,67,54 ,.9); 
                }

                thead {
                    font-weight: bold;
                    background: #FFEE58;
                }

                tbody {
                    tr:nth-child(even) {
                        background: #FCE4EC;
                    }
                }

                td {
                    padding: 6px;
                }
            }

            .totalPrice {
                color: #48a38e;
                font-weight: bold;
                font-size: 18px;
                letter-spacing: 1px;
            }

            .checkout {
                outline: none;
                border-radius: 5px;
            }

            &:before, &:after {
                content: '';
                border-width: 12px;
                border-style: solid;
                border-color: #fff #fff transparent transparent;
                height: 0;
                width: 0;
                position: absolute;
                bottom: 0px;
                right: 20px;
                transform: translateY(100%);
            }

            &:before {
                border-width: 13px;
                border-style: solid;
                border-color: #888 #888 transparent transparent;
               
                right: 19px;
            }
        }

        .noCart {
            padding: 10px;

            i {
                font-size: 24px;
            }
        }
    }
</style>