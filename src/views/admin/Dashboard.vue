<template>
    <div>
        <div class="container-fluid ">
            <div class="row">
                <input type="checkbox" id="dashboard-nav-toggle" class="d-none">
                <div class="dashboard-nav bg-dark vh-100 text-light">
                    <div class="overflow-hidden">

                        <h4 class="text-center p-2 header">後台管理系統</h4>
                        <div class="user-panel p-2 d-flex align-items-center">
                            <div class="rounded-circle overflow-hidden mr-3" style="width:45px;height:45px">
                                <img src="../../assets/image/customer1.jpg" alt="user" class="w-100 h-100" style="object-fit:cover">
                            </div>
                            <div>
                                <p class="mb-2" style="font-size:14px">Joe Black</p>
                                <span class="bg-success rounded-circle d-inline-block mr-1" style="width:10px;height:10px"></span>
                                <span style="font-size:12px">online</span>
                            </div>
                        </div>
                        <ul class="dashboard-menu py-2">
                            <h6 class="text-white-50 px-2">Menu</h6>
                            <li class="dashboard-menu-item">
                                <router-link to="/admin/products" class="active">
                                    <i class="fas fa-box"></i>商品管理
                                </router-link>
                            </li>
                            <li class="dashboard-menu-item">
                                <router-link to="/admin/orders">
                                    <i class="fas fa-list-ul"></i>訂單管理
                                </router-link>
                            </li>
                            <li class="dashboard-menu-item">
                                <router-link to="/admin/coupons">
                                    <i class="fas fa-ticket-alt"></i>優惠券
                                </router-link>
                            </li>
                            <li class="dashboard-menu-item">
                                <router-link to="/">
                                    <i class="fas fa-home"></i>回到首頁
                                </router-link>
                            </li>
                            <li class="dashboard-menu-item">
                                <a href="#logoutModal" data-toggle="modal">
                                    <i class="fas fa-power-off"></i>登出
                                </a>
                            </li>
                        </ul>
                    </div>
                    <label for="dashboard-nav-toggle" class="bg-dark py-2 px-1 rounded-right">
                        <i class="fas fa-chevron-left text-light" v-if="navToggle_value"></i>
                        <i class="fas fa-chevron-right text-light" v-else></i>
                    </label>
                </div>
                <div class="bg-mask vw-100 vh-100 position-fixed"></div>
                <div class="col bg-light main-col">
                    <main>
                        <router-view></router-view>
                    </main>
                </div>
            </div>
        </div>

        <!-- logoutModal -->
        <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header bg-primary text-light">
                    <h5 class="modal-title" id="logoutModalLabel"><i class="fas fa-door-open"></i> 登出</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    確定要登出?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="signout">確定</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import { fb } from '../../firebase'

export default {
    data() {
        return {
            navToggle_value: true,
        }
    },
    methods: {
        async signout() {
            const data = await fb.auth().signOut().then(() => {
                $('#logoutModal').modal('hide'); // 手動關閉動態視窗 modal
                this.$router.replace('/signin');
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    mounted() {
        const vm = this;
        const navToggle = document.querySelector('#dashboard-nav-toggle');
        navToggle.checked = true; //一開始便顯示 .dashboard-nav
        navToggle.addEventListener('change', function() {
            vm.navToggle_value = this.checked;
        });
    }
}
</script>