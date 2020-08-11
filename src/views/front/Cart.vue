<template>
    <div>
        <div class="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb border-bottom">
                    <li class="breadcrumb-item h6"><router-link to="/">首頁</router-link></li>
                    <li class="breadcrumb-item active h6" aria-current="page">購物車</li>
                </ol>
            </nav>
        </div>
        <div class="container">
            <h3 class="text-center mb-3">購物車內容</h3>
            <div>
                <table class="table d-none d-md-table">
                    <thead class="bg-dark text-light">
                        <tr>
                            <th></th>
                            <th scope="col">品項</th>
                            <th scope="col">單價</th>
                            <th scope="col">數量</th>
                            <th scope="col">總計</th>
                            <th scope="col" width="80px">刪除</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in cart" :key="item.product.productId">
                            <td width="124px">
                                <img :src="item.product.imgURL" alt="product" width="100%" height="auto">
                            </td>
                            <td>
                                {{ item.product.title }}
                            </td>
                            <td>$ {{ item.product.price }}</td>
                            <td>{{ item.qty }}{{ item.product.unit }}</td>
                            <td>$ {{ item.product.price*item.qty }}</td>
                            <td>
                                <button class="btn btn-outline-danger" @click="deleteCart(item.product.productId)">
                                    <i class="far fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table class="table mobile d-table d-md-none">
                    <tbody class="border-0" v-for="item in cart" :key="item.product.productId">
                        <tr>
                            <td>
                                <img :src="item.product.imgURL" alt="product" width="100%">
                            </td>
                            <td>
                                {{ item.product.title }}<br>
                                $ {{ item.product.price }}
                            </td>
                            <td class="text-right">
                                <button class="btn btn-outline-danger" @click="deleteCart(item.product.productId)">
                                    <i class="far fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="border-0">x{{ item.qty }}{{ item.product.unit }}</td>
                            <td class="border-0 text-right">${{ item.product.price*item.qty }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="container mb-5">
            <h5 class="p-3 bg-light text-right">總計 <span class="text-danger">$ {{ total }}</span></h5>
        </div>
        <div class="container mb-5">
            <h3 class="text-center mb-3">優惠碼</h3>
            <div class="form-group d-flex coupon col-md-8 mx-auto">
                <input type="text" class="form-control col" placeholder="請輸入優惠碼">
                <button class="btn btn-outline-danger">套用優惠碼</button>
            </div>
            <!-- <div class="col-md-8 mx-auto clearfix">
                <button class="btn btn-danger float-right">填寫訂購資料</button>
            </div> -->
        </div>
        <div class="container">
            <h3 class="text-center mb-3">結帳表單</h3>
            <div class="col-md-10 mx-auto mb-5">
                <form>
                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="text" name="email" id="email" class="form-control" placeholder="請輸入 Email" v-model="user.email" spellcheck="false" v-validate="'required|email'" :class="{'is-invalid': errors.first('email')}">
                        <span class="text-danger" v-text="errors.first('email')"></span>
                    </div>
                    <div class="form-group">
                        <label for="name">收件人姓名 *</label>
                        <input type="text" name="名字" id="name" class="form-control" placeholder="請輸入姓名" v-model="user.name"  v-validate="'required'" :class="{'is-invalid': errors.first('名字')}">
                        <span class="text-danger" v-text="errors.first('名字')"></span>
                    </div>
                    <div class="form-group">
                        <label for="phone">收件人電話 *</label>
                        <input type="text" name="電話" id="phone" class="form-control" placeholder="請輸入電話" v-model="user.phone"  v-validate="'required|numeric'" :class="{'is-invalid': errors.first('電話')}">
                        <span class="text-danger" v-text="errors.first('電話')"></span>
                    </div>
                    <div class="form-group">
                        <label for="address">收件人地址 *</label>
                        <input type="text" name="地址" id="address" class="form-control" placeholder="請輸入地址" v-model="user.address"  v-validate="'required'" :class="{'is-invalid': errors.first('地址')}">
                        <span class="text-danger" v-text="errors.first('地址')"></span>
                    </div>
                    <div class="form-group">
                        <label for="comment">留言</label>
                        <textarea id="comment" class="form-control" rows="5" v-model="user.comment" spellcheck="false"></textarea>
                    </div>
                </form>
                <div class="text-right">
                    <button class="btn btn-danger" @click="createOrder">建立訂單</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../../DateFormate'
import {fb} from '../../firebase'
const db = fb.firestore();

export default {
    computed: {
        cart() {
            return this.$store.state.cart.cart;
        },
        total() {
            return this.$store.state.cart.total;
        }
    },
    data() {
        return {
            user: {
                name: '',
                email: '',
                phone: '',
                address: '',
                comment: ''
            }
        }
    },
    methods: {
        getCart() {
            this.$store.dispatch('getCart');
        },
        deleteCart(id) {
            this.$store.dispatch('deleteCart', id);
        },
        clearCart() {
            const vm = this;
            db.collection('cart').get().then(res => {  //刪除購物車中所有商品
                res.forEach(item => {
                    item.ref.delete();
                    vm.$store.dispatch('getCart');
                });
            });
        },
        createOrder() {
            const vm = this;
            const now_d = new Date().format("yyyy-MM-dd hh:mm:ss");
            let orderId = '';
            this.$validator.validate().then((result) => {
                if (result) {
                    const data = (Object.assign({}, {cart: vm.cart, user:vm.user, total: vm.total, createTime: now_d, ispaid: false}));

                    vm.$store.commit('LOADING', true);
                    db.collection('orders').add(data)
                    .then((doc) => {
                        vm.$store.commit('LOADING', false);
                        orderId = doc.id;
                        vm.clearCart();
                        this.$router.push(`/checkout/payment/${orderId}`);
                    })
                    .catch(function(error) {
                        vm.$store.commit('LOADING', false);
                        console.error("Error adding document: ", error);
                    })
                } else {
                    this.$store.dispatch('updateMessage', {message: '請正確完成表單', status: 'danger'});
                }
            });

            // db.collection('cart').get().then(res => {  //刪除購物車中所有商品
            //     res.forEach(item => {
            //         item.ref.delete();
            //         vm.$store.dispatch('getCart');
            //     });
            // });

            // this.$router.push('/checkout/payment/sZOTwVzewih2tHlqowsL');
        }
    },
    created() {
        this.getCart();
    }
}
</script>

<style lang="scss" scoped>
.table {
    tr {
        th {
            border: 0;
        }
        td {
            vertical-align: middle;

            img {
                object-fit: cover;
            }
        }
    }
}

.table.mobile {
    tbody {
        &:first-child {
            td {
                border: 0;
            }
        }

        tr:first-child {
            font-size: 14px;

            td {
                &:first-child {
                    max-width: 124px;
                }
                
                i {
                    font-size: 14px;
                }
            }
        }
    }
}

.coupon {
    input {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: 0;
    }
    button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
}
</style>