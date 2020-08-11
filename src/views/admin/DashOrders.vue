<template>
    <div>
        <div>
            <div class="d-flex my-3 justify-content-between border-bottom py-3">
                <h2 class="m-0">訂單管理</h2>
            </div>
            <div class="d-none d-md-block">
                <table class="table bg-white">
                    <thead>
                        <tr class="bg-dark text-light">
                            <th scope="col" class="rounded-left overflow-hidden">購買時間</th>
                            <th scope="col">Email</th>
                            <th scope="col" class="d-none d-lg-table-cell" width="200px">購買款項</th>
                            <th scope="col" width="100px">應付金額</th>
                            <th scope="col" width="100px" class="text-center">是否付款</th>
                            <th scope="col" class="text-center rounded-right overflow-hidden" width="80px">編輯</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orders" :key="order.orderId">
                            <td>{{ order.createTime }}</td>
                            <td>{{ order.user.email }}</td>
                            <td class="d-none d-lg-table-cell">
                                <ul style="list-style:disc inside">
                                    <li v-for="item in order.cart" :key="item.cartId">{{ `${item.product.title}x${item.qty}` }}</li>
                                </ul>
                            </td>
                            <td>$ {{ order.total }}</td>
                            <td class="text-center">
                                <span class="text-success" v-if="order.ispaid">已付款</span>
                                <span class="text-danger" v-else>尚未付款</span>
                            </td>
                            <td class="text-center">
                                <button class="btn btn-sm btn-primary mx-1" @click="openDetailOrder(order)" data-toggle="modal" data-target="#orderDetailModal">詳請</button>
                            </td>
                        </tr>
                        <!-- <tr v-for="n in 10" :key="n">
                            <td>2020-02-18 14:48:41</td>
                            <td>joejoe12345dc@gmail.com</td>
                            <td class="d-none d-lg-table-cell">
                                <ul style="list-style:disc inside">
                                    <li>特級巧克力蛋糕x1</li>
                                    <li>聖多諾黑x2</li>
                                    <li>草莓優格x10</li>
                                </ul>
                            </td>
                            <td>$ 4200</td>
                            <td class="text-center">
                                <span class="text-success" v-if="false">已付款</span>
                                <span class="text-danger" v-else>尚未付款</span>
                            </td>
                            <td class="text-center">
                                <button class="btn btn-sm btn-primary mx-1" data-toggle="modal" data-target="#orderDetailModal">詳請</button>
                            </td>
                        </tr> -->
                    </tbody>
                </table>
            </div>

            <div class="d-md-none">
                <ul>
                    <li v-for="order in orders" :key="order.orderId" class="item border-bottom mb-3 text-dark">
                        <div class="h5 font-weight-bold mb-1">購買時間:</div>
                        <p class="font-weight-bold">{{ order.createTime }}</p>
                        <div class="h5 font-weight-bold mb-1">訂單編號:</div>
                        <p class="font-weight-bold">{{order.orderId}}</p>
                        <div class="mb-2 d-flex justify-content-between align-items-center">
                            <div class="h5 font-weight-bold text-success" v-if="order.ispaid">已付款</div>
                            <div class="h5 font-weight-bold text-danger" v-else>尚未付款</div>
                            <button class="btn btn-primary mx-1" @click="openDetailOrder(order)" data-toggle="modal" data-target="#orderDetailModal">詳請</button>
                        </div>
                    </li>
                </ul>
                <!-- <ul>
                    <li v-for="n in 10" :key="n" class="item border-bottom mb-3 text-dark">
                        <div class="h5 font-weight-bold mb-1">購買時間:</div>
                        <p class="font-weight-bold">2020-02-18 14:48:41</p>
                        <div class="h5 font-weight-bold mb-1">訂單編號:</div>
                        <p class="font-weight-bold">M0M2_FDDXTDhvi5j03E</p>
                        <div class="mb-2 d-flex justify-content-between align-items-center">
                            <div class="h5 font-weight-bold text-success" v-if="false">已付款</div>
                            <div class="h5 font-weight-bold text-danger" v-else>尚未付款</div>
                            <button class="btn btn-primary mx-1" data-toggle="modal" data-target="#orderDetailModal">詳請</button>
                        </div>
                    </li>
                </ul> -->
            </div>

            <div class="modal fade pr-0" id="orderDetailModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                    <div class="modal-header bg-dark text-light">
                        <h5 class="modal-title" id="orderDetailModalLabel">訂單詳情</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="h5 font-weight-bold">訂單資訊</div>
                                <p>訂單成立日期： {{ tempOrder.createTime }}</p>
                                <p>訂單編號： {{ tempOrder.orderId }}</p>
                                <p>是否付款： <span class="text-success" v-if="tempOrder.ispaid">已付款</span>
                                    <span class="text-danger" v-else>尚未付款</span>
                                </p>
                                <hr />
                                <div class="h5 font-weight-bold">購買款項</div>
                                <ul class="mb-3" style="list-style:disc inside">
                                    <li v-for="item in tempOrder.cart" :key="item.cartId">{{ `${item.product.title}x${item.qty}` }}</li>
                                </ul>
                                <div class="h5 font-weight-bold">總金額: $ {{ tempOrder.total }}</div>
                                <hr class="d-md-none" />
                            </div>
                            <div class="col-md-6">
                                <div class="h5 font-weight-bold">購買者資訊</div>
                                <div class="form-group">
                                    <label for="name">姓名:</label>
                                    <input type="text" id="name" class="form-control bg-white text-dark" :value="tempOrder.user.name" readonly>
                                </div>
                                <div class="form-group">
                                    <label for="phone">電話:</label>
                                    <input type="text" id="phone" class="form-control bg-white text-dark" :value="tempOrder.user.phone" readonly>
                                </div>
                                <div class="form-group">
                                    <label for="email">信箱:</label>
                                    <input type="text" id="email" class="form-control bg-white text-dark" :value="tempOrder.user.email" readonly >
                                </div>
                                <div class="form-group">
                                    <label for="address">地址:</label>
                                    <input type="text" id="address" class="form-control bg-white text-dark" :value="tempOrder.user.address" readonly>
                                </div>
                                <div class="form-group">
                                    <label for="comment">留言:</label>
                                    <textarea id="comment" class="form-control bg-white text-dark" :value="tempOrder.user.comment" readonly>
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="row">
                            <div class="col-md-6">
                                <div class="h5 font-weight-bold">訂單資訊</div>
                                <p>訂單成立日期： 2020-02-18 14:48:41</p>
                                <p>訂單編號： M0M2_FDDXTDhvi5j03E</p>
                                <p>是否付款： <span class="text-success">已付款</span></p>
                                <hr />
                                <div class="h5 font-weight-bold">購買款項</div>
                                <ul class="mb-3" style="list-style:disc inside">
                                    <li>特級巧克力蛋糕x1</li>
                                    <li>聖多諾黑x2</li>
                                    <li>草莓優格x10</li>
                                </ul>
                                <div class="h5 font-weight-bold">總金額: $ 4200</div>
                                <hr class="d-md-none" />
                            </div>
                            <div class="col-md-6">
                                <div class="h5 font-weight-bold">購買者資訊</div>
                                <div class="form-group">
                                    <label for="name">姓名:</label>
                                    <input type="text" id="name" class="form-control bg-white text-dark" value="王小明" readonly>
                                </div>
                                <div class="form-group">
                                    <label for="phone">電話:</label>
                                    <input type="text" id="phone" class="form-control bg-white text-dark" value="0912345678" readonly>
                                </div>
                                <div class="form-group">
                                    <label for="email">信箱:</label>
                                    <input type="text" id="email" class="form-control bg-white text-dark" value="joejoe12345dc@gmail.com" readonly >
                                </div>
                                <div class="form-group">
                                    <label for="address">地址:</label>
                                    <input type="text" id="address" class="form-control bg-white text-dark" value="台北市松山區經國路85號三樓" readonly>
                                </div>
                                <div class="form-group">
                                    <label for="comment">留言:</label>
                                    <textarea id="comment" class="form-control bg-white text-dark" readonly>
                                        因為要送禮，麻煩給我們禮品紙袋，謝謝
                                    </textarea>
                                </div>
                            </div>
                        </div> -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        orders() {
            return this.$store.state.admin.orders;
        }
    },
    data() {
        return {
            tempOrder: {
                cart: [],
                createTime: "",
                ispaid: false,
                orderId: "",
                total: 0,
                user: {
                    name: "",
                    email: "",
                    phone: "",
                    address: "",
                    comment: ""
                }
            }
        }
    },
    methods: {
        getOrders() {
            this.$store.dispatch('getOrders');
        },
        openDetailOrder(order) {
            this.tempOrder = order;
        }
    },
    created() {
        this.getOrders();
    }
}
</script>

<style lang="scss" scoped>
.table {
    thead {
        th {
            border: 0;
            text-align: left;
            vertical-align: middle;
        }
    }
    tbody {
        td {
            text-align: left;
            vertical-align: middle;
        }
    }
}
</style>