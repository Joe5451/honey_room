import Vue from 'vue'
import Vuex from 'vuex'

import admin from './admin'
import cart from './cart'

import {fb} from '../firebase'
const db = fb.firestore();

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    active: '',
    cusProducts: [],
    messages: []
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    GETCUSPRODUCTS(state, res) {
      state.cusProducts = res;
    },
    MESSAGE(state, {message, status}) {
      const timestamp = Math.floor(new Date() / 1000);
      state.messages.push({
        message,
        status,
        timestamp
      })
    },
    REMOVEMESSAGE(state, index) {
      state.messages.splice(index, 1);
    }
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
    getCusProducts(context) {
      context.commit('LOADING', true);
      const response = [];
      db.collection("products").where('using','==',true).get().then(function(querySnapshot) {  //只篩選啟用中 using = true 的資料
          querySnapshot.forEach(function(doc) {
              response.push(Object.assign(doc.data(), {productId: doc.id}));
          });
          context.commit('LOADING', false);
          context.commit('GETCUSPRODUCTS', response);
      })
      .catch(function(error) {
          context.commit('LOADING', false);
          console.error("Error adding document: ", error);
          alert('商品資料讀取失敗');
      });
    },
    updateMessage(context, {message, status}) {
      context.commit('MESSAGE', {message, status});
      const timestamp = Math.floor(new Date() / 1000);
      context.dispatch('removeMessageWithTiming', timestamp);
    },
    removeMessageWithTiming(context, timestamp) {
      setTimeout(() => {
        context.state.messages.forEach((item, index) => {
          if (item.timestamp == timestamp) {
            context.state.messages.splice(index, 1);
          }
        });
      }, 5000);
    },
    removeMessage(context, index) {
      context.commit('REMOVEMESSAGE', index);
    }
  },
  modules: {
    admin,
    cart
  }
})
