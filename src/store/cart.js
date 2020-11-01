import {fb} from '../firebase.js';
import axios from 'axios'

const db = fb.firestore();

export default {
    state: {
        cart: [],
        total: 0
    },
    mutations: {
        GETCART(state, data) {
            state.cart = data;
            // console.log('cart: ', data);
            this.commit('CALTOTAL', data);
        },
        CALTOTAL(state, data) {
            let total = 0;
            data.forEach(item => {
                total += item.qty * item.product.price;
            });
            state.total = total;
        }
    },
    actions: {
        getCart(context) {
            context.commit('LOADING', true);
            axios.get('https://us-central1-test-ecommerce-b68d1.cloudfunctions.net/app/api/cart-read')
            .then(res => {
                context.commit('GETCART',res.data);  // 回傳的資料透過 api 處理會加上 cartId 的資料
                context.commit('LOADING', false);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                context.commit('LOADING', false);
            })
        },
        addtoCart(context, data) {
            if (!data.qty) return; // 如果數量為 0 則跳出
            const cart = this.state.cart.cart;
            const existCart = cart.filter(item => {
                return item.product.productId == data.id;
            });  
            
            const newCart = {product: data.product, qty: data.qty};

            if (existCart.length > 0) { // 判斷商品是否已存在購物車中
                newCart.qty = data.qty + existCart[0].qty;
            }

            context.commit('LOADING', true);
            db.collection('cart').doc(data.id).set(newCart)
            .then(() => {
                context.commit('LOADING', false);
                context.dispatch('getCart');
                context.dispatch('updateMessage', {message: '已加入購物車', status: 'success'});
            })
            .catch(function(error) {
                context.commit('LOADING', false);
                console.error("Error adding document: ", error);
            });
        },
        deleteCart(context, id) {
            context.commit('LOADING', true);
            db.collection('cart').doc(id).delete()
            .then(() => {
                context.commit('LOADING', false);
                context.dispatch('getCart');
                context.dispatch('updateMessage', {message: '已從購物車刪除商品', status: 'success'});
            })
            .catch(function(error) {
                context.commit('LOADING', false);
                console.error("Error adding document: ", error);
                alert('刪除購物車失敗');
            })
        },
        createOrder(context, data) {
            context.commit('LOADING', true);
            db.collection('order').add(data)
            .then((doc) => {
                context.commit('LOADING', false);
            })
            .catch(function(error) {
                context.commit('LOADING', false);
                console.error("Error adding document: ", error);
            })
        }
    },
    modules: {
    }
}