import {fb} from '../firebase.js';

const db = fb.firestore();

export default {
    state: {
        products: [],
        orders: []
    },
    mutations: {
        GETPRODUCTS(state, res) {
            state.products = res;
        },
        GETORDERS(state, res) {
            state.orders = res;
        }
    },
    actions: {
        getProducts(context) {
            context.commit('LOADING', true);
            const response = [];
            db.collection("products").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    response.push(Object.assign(doc.data(), {productId: doc.id}));
                });
                context.commit('LOADING', false);
                context.commit('GETPRODUCTS', response);
            })
            .catch(function(error) {
                context.commit('LOADING', false);
                console.error("Error adding document: ", error);
                alert('商品資料讀取失敗');
            });
        },
        addProduct(context, product) {
            context.commit('LOADING',true);
            db.collection('products').add(product)
            .then(() => {
                context.commit('LOADING', false);
                context.dispatch('getProducts');
            })
            .catch(function(error) {
                context.commit('LOADING', false);
                console.error("Error adding document: ", error);
                alert('商品新增失敗');
            });
        },
        updateProduct(context, product) {
            context.dispatch('updateLoading', true);
            const id = product.productId;
            delete product.productId;
    
            db.collection('products').doc(id).update(product)
            .then(() => {
                context.dispatch('updateLoading', false);
                context.dispatch('getProducts');
            })
            .catch((error) => {
                this.$store.dispatch('updateLoading', false);
                console.error("Error adding document: ", error);
                alert('商品更新失敗');
            });        
        },
        deleteProduct(context, id) {
            context.commit('LOADING', true);
            db.collection("products").doc(id).delete()
            .then(() => {
                context.commit('LOADING', false);
                context.dispatch('getProducts');
            })
            .catch(function(error) {
                context.commit('LOADING', false);
                console.error("Error removing document: ", error);
                alert('商品刪除失敗');
            });
        },
        getOrders(context) {
            context.commit('LOADING', true);
            const response = [];
            db.collection("orders").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    response.push(Object.assign(doc.data(), {orderId: doc.id}));
                });
                context.commit('LOADING', false);
                context.commit('GETORDERS', response);
            })
            .catch(function(error) {
                context.commit('LOADING', false);
                console.error("Error adding document: ", error);
                alert('訂單資料讀取失敗');
            });
        }
    },
    modules: {
    }
}