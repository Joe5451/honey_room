<template>
    <div>
        <div>
            <div class="d-flex my-3 justify-content-between border-bottom py-3">
                <h2 class="m-0">商品管理</h2>
                <button class="btn btn-primary" @click="openModal(true)">新增商品</button>
            </div>
            <div class="d-none d-md-block">
                <table class="table bg-white">
                    <thead>
                        <tr class="bg-dark text-light">
                            <th scope="col" class="rounded-left overflow-hidden">分類</th>
                            <th scope="col">商品名稱</th>
                            <th scope="col" width="100px">原價</th>
                            <th scope="col" width="100px">售價</th>
                            <th scope="col" width="80px">單位</th>
                            <th scope="col" class="text-center" width="80px">狀態</th>
                            <th scope="col" class="text-center rounded-right overflow-hidden" width="140px">編輯</th>
                        </tr>
                    </thead>
                    <tbody>
                         <tr v-for="product in products" :key="product.productId">
                            <td>{{ product.category }}</td>
                            <td>{{ product.title }}</td>
                            <td class="d-none d-md-table-cell">$ {{ product.origin_price }}</td>
                            <td>$ {{ product.price }}</td>
                            <td class="d-none d-md-table-cell text-center">{{ product.unit }}</td>
                            <td class="text-center">
                                <span class="text-success" v-if="product.using">啟用</span>
                                <span class="text-danger" v-else>未啟用</span>
                            </td>
                            <td class="text-center">
                                <button class="btn btn-sm btn-primary mx-1" @click="openModal(false, product)">編輯</button>
                                <button class="btn btn-sm btn-danger mx-1" @click="openDelModal(product)">刪除</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="d-md-none">
                <ul>
                    <li v-for="product in products" :key="product.productId" class="border-bottom mb-3">
                        <h5>{{ product.title }}</h5>
                        <div class="d-flex flex-wrap justify-content-between align-items-center">
                            <h6>
                                原價 ${{ product.origin_price }}<br />
                                售價 ${{ product.price }}
                            </h6>
                            <div class="text-center">
                                <span class="bg-secondary text-light rounded-pill p-1">{{ product.category }}</span><br />
                                <span class="text-success" v-if="product.using">啟用</span>
                                <span class="text-danger" v-else>未啟用</span>
                            </div>
                        </div>
                        <div class="mb-2">
                            <button class="btn btn-sm btn-primary mx-1" @click="openModal(false, product)">編輯</button>
                            <button class="btn btn-sm btn-danger mx-1" @click="openDelModal(product)">刪除</button>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- productModal -->
            <div class="modal fade pr-0" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header bg-dark text-light">
                            <h5 class="modal-title" id="exampleModalLabel">
                                <span v-if="newMode">新增商品</span>
                                <span v-else>編輯商品</span>
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label for="productFile">
                                            上傳圖片
                                            <!-- 上傳時的 loading -->
                                            <!-- <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i> -->
                                        </label>
                                        <input type="file" id="productFile" class="form-control" @change="function(e) {uploadImage(e, tempProduct.title)}">
                                    </div>
                                    <div class="img-container mb-3">
                                        <img v-if="tempProduct.imgURL" :src="tempProduct.imgURL" alt="product" width="100%">
                                        <!-- <img :src="tempProduct.imgURL" alt="product" width="100%"> -->
                                    </div>
                                </div>
                                <div class="col-sm-8">
                                    <div class="form-group">
                                        <label for="title">商品名稱</label>
                                        <input type="text" id="title" class="form-control" placeholder="請輸入商品名稱" v-model="tempProduct.title">
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-6 form-group">
                                            <label for="category">分類</label>
                                            <input type="text" id="category" class="form-control" placeholder="請輸入分類" v-model="tempProduct.category">
                                        </div>
                                        <div class="col-md-6 form-group">
                                            <label for="unit">單位</label>
                                            <input type="text" id="unit" class="form-control" placeholder="請輸入單位" v-model="tempProduct.unit">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-6 form-group">
                                            <label for="origin_price">原價</label>
                                            <input type="number" id="origin_price" class="form-control" placeholder="請輸入原價" v-model="tempProduct.origin_price">
                                        </div>
                                        <div class="col-md-6 form-group">
                                            <label for="price">售價</label>
                                            <input type="number" id="price" class="form-control" placeholder="請輸入售價" v-model="tempProduct.price">
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="form-group">
                                        <label for="content">請輸入商品內容</label>
                                        <textarea id="content" class="form-control" placeholder="請輸入產品內容" v-model="tempProduct.content"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" id="is_using" v-model="tempProduct.using">
                                            <label for="is_using" class="form-check-label">是否啟用</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" @click="handleProduct">
                                <span v-if="newMode">新增</span>
                                <span v-else>更新</span>
                            </button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- delProductModal -->
            <div class="modal fade pr-0" id="delProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header bg-danger">
                            <h5 class="modal-title text-light" id="exampleModalLabel2">刪除商品</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p class="text-secondary">
                                是否刪除 <span class="text-danger font-weight-bold">{{ tempProduct.title }}</span> 商品(刪除後將無法復原)。
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" @click="deleteProduct(tempProduct.productId)">確認刪除</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import {fb} from '../../firebase'
// const db = fb.firestore();

export default {
    computed: {
        products() {
            return this.$store.state.admin.products;
        }
    },
    data() {
        return {
            tempProduct: {},
            newMode: false
        }
    },
    methods: {
        getProducts() {
            this.$store.dispatch('getProducts');
        },
        openModal(isNew, product) {
            if (isNew) {
                this.tempProduct = {
                    title: '',
                    category: '',
                    content: '',
                    imgURL: '',
                    origin_price: '',
                    price: '',
                    unit: '',
                    using: false
                };
                this.newMode = true;
            } else {
                this.tempProduct = Object.assign({}, product);
                this.newMode = false;
            }
            $('#productFile').val(''); //清空圖片檔案，也可以使用下一行的方式
            // document.getElementById('productFile').value = "";

            $('#content').css("height", "134px");
            $('#productModal').modal('show');
        },
        openDelModal(product) {
            $('#delProductModal').modal('show');
            this.tempProduct = Object.assign({}, product);
        },
        handleProduct() {
            const vm = this;
            if (vm.newMode) {
                vm.$store.dispatch('addProduct', vm.tempProduct);
                $('#productModal').modal('hide');
            } else {
                vm.$store.dispatch('updateProduct', vm.tempProduct)
                $('#productModal').modal('hide');
            }
        },
        uploadImage(e, title) {
            if (e.target.files[0]) {
                this.$store.dispatch('updateLoading', true);
                const file = e.target.files[0];
                const storageRef = fb.storage().ref(`products/${title}/${file.name}`); //為每個商品設立一個資料夾並存放一張圖片
                const uploadTask = storageRef.put(file);
                const vm = this;

                uploadTask.on('state_changed', function(snapshot){
                }, function(error) {
                        // Handle unsuccessful uploads
                        vm.$store.dispatch('updateLoading', false);
                }, function() {
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        vm.tempProduct.imgURL = downloadURL;
                        vm.$store.dispatch('updateLoading', false);
                    });
                });
            }
        },
        deleteProduct(id) {
            this.$store.dispatch('deleteProduct', id);
            $('#delProductModal').modal('hide');
        }
    },
    created() {
        this.getProducts();
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

.modal {
    input[type='file'].form-control {
        height: auto;
    }
}
</style>