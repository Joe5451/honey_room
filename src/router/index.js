import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: () =>import('../views/front/Front.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/front/Home.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/front/About.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/front/Products.vue')
      },
      {
        path: 'products/:productId',
        name: 'SingleProduct',
        component: () => import('../views/front/SingleProduct.vue')
      },
      {
        path: 'signin',
        name: 'Login',
        component: () => import('../views/front/Login.vue')
      }
    ]
  },
  {
    path: '/checkout',
    component: () => import('../views/front/Checkout.vue'),
    children: [
      {
        path: '',
        name: 'Cart',
        component: () => import('../views/front/Cart.vue')
      },
      // {
      //   path: 'customerinfo',
      //   name: 'CustomerInfo',
      //   component: () => import('../views/front/CustomerInfo.vue')
      // },
      {
        path: 'payment/:orderId',
        name: 'Payment',
        component: () => import('../views/front/Payment.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/admin/Dashboard.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'products',
        name: 'DashProducts',
        component: () => import('../views/admin/DashProducts.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'coupons',
        name: 'Coupon',
        component: () => import('../views/admin/Coupon.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'DashOrders',
        component: () => import('../views/admin/DashOrders.vue'),
        meta: { requiresAuth: true}
      }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) { // 透過瀏覽器的前進後退觸發
      return savedPosition 
    } else {
      return { x: 0, y: 0 } // 跳轉頁面時回到最頂
    }
  }
})

export default router
