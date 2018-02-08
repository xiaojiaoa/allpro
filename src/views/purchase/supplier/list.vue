<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div>
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title">供应商列表</div>
          <ul class="page-methods">
            <li>
              <router-link :to="{path: '/purchase/supplierSort/list'}">
                <el-button type="primary">供应商分类</el-button>
              </router-link>
              <router-link :to="{path: '/purchase/supplier/edit'}" v-if="$_has8('add00')">
                <el-button type="primary">新增供应商</el-button>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="table dis-flex" v-loading.lock="loading">
        <div class="admin-table dis-flex">
            <table class="admin-main-table">
              <thead>
              <tr>
                <th>序号</th>
                <th v-for="value in thead" :title="value">
                  {{value}}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in tbody">
                <td>
                  {{index +1 }}
                </td>
                <td class="router"><span @click="detail(item.id)">{{item.name}}</span></td>
                <td>{{item.cateName}}</td>
                <td>{{item.contact}}</td>
                <td>{{item.contactMobile}}</td>
                <td>{{item.grade}}</td>
                <td>{{item.empName}}</td>
                <td>{{item.deptName}}</td>
                <td>{{unixFormat(item.addTime)}}</td>
                <td>{{item.provinceStr}}-{{item.cityStr}}-{{item.distStr}}-{{item.address}}</td>
                <td>
                  <router-link :to="{path: `/purchase/supplier/edit/${item.id}`}">
                    <el-button type="primary" v-if="item.isDeleted === 1 && $_has8('add00')">修改</el-button>
                  </router-link>
                  <el-button v-if="$_has8('add00')" :type="item.isDeleted==1?'danger':'primary'" @click="stateEdit(item.id, item.isDeleted)">{{item.isDeleted == 1?'禁用':'启用'}}</el-button>
                </td>
              </tr>
              <tr v-if="tbody.length==0 && !loading">
                  <td :colspan="thead.length + 1" class="nothing-data">暂无数据</td>
              </tr>
              </tbody>
            </table>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paginationData.page"
          :page-size="paginationData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginationData.totalItems">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import screening from '../../../components/screening.vue';
  import { Purchase, Assistant } from '../../../services/admin';
  import mixins from '../../../components/mixins/base';

  export default {
    data() {
      return {
        thead: ['供应商名称', '供应商分类名称', '联系人', '联系电话', '供应商等级', '员工名称', '创建部门', '创建时间', '详细地址', '操作'],
        tbody: [],
        screening: [
          [
            {
              label: '联系人手机',
              type: 'input',
              field: 'mobile',
            },
            {
              label: '供应商名称',
              type: 'input',
              field: 'name',
            },
            {
              label: '交货方式',
              type: 'select',
              field: 'deliveryType',
              data: [],
            },
          ],
        ],
        paginationData: {},
        conditions: {
          pageSize: '',
          pageNo: '',
        },
        loading: false,
        permissions: {
          getList: false,
        },
      };
    },
    created() {
      this.init();
    },
    mixins: [mixins],
    methods: {
      init: function (val) {
        this.permissions.getList = this.$_hasMulti8('get00,get01,get03');
        if (this.permissions.getList) {
          this.loading = true;
          Purchase.supList(val).then(res => {
            this.loading = false;
            this.paginationData = res.data;
            this.tbody = res.data.result;
            this.conditions.pageSize = res.data.pageSize;
            this.conditions.pageNo = res.data.page;
          }).catch(err => {
            console.log(err);
          });
        }
        Assistant.supDelivery()
          .then(res => {
            this.screening[0][2].data = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
      stateEdit: function (id, isDelete) {
        const isDeleted = (isDelete === 1 ? 2 : 1);
        this.$confirm('确认操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          type: 'warning',
        }).then(() => {
          Purchase.supForbid(id, isDeleted)
            .then(res => {
              console.log(res);
              let msg = '';
              if (isDelete === 1) {
                msg = '禁用成功';
              } else {
                msg = '启用成功';
              }
              this.$message({
                message: msg,
                type: 'success',
              });
              this.init();
            })
            .catch(err => {
              console.log(err);
            });
        });
      },
      query: function (val) {
        if (Object.keys(val).length === 0) {
          this.conditions = {};
          this.conditions.pageSize = this.paginationData.pageSize;
          this.conditions.pageNo = this.paginationData.page;
          this.paginationData.page = 0;
        } else {
          Object.assign(this.conditions, val);
          this.paginationData.page = 0;
        }
      },
      handleSizeChange: function (val) {
        this.paginationData.pageSize = val;
        this.conditions.pageSize = val;
        this.paginationData.page = 0;
      },
      handleCurrentChange: function (val) {
        this.paginationData.page = val;
      },
      detail: function (val) {
        this.$router.push(`/purchase/supplier/detail/${val}`);
      },
    },
    computed: {
      conditionsWatch: function () {
        return this.paginationData.page;
      },
      ...mapState('Global', ['permissRemark']),
    },
    components: {
      screening,
    },
    watch: {
      conditionsWatch: function (val) {
        if (val !== 0) {
          this.conditions.pageNo = val;
          this.init(this.conditions);
        }
      },
      permissRemark(val) {
        if (val) {
          this.init(this.$route.params.id);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
