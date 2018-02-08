<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div>
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title">请购列表</div>
          <ul class="page-methods">
            <li>
              <router-link :to="{path: '/purchase/requisition/edit'}" v-if="$_has8('add00')">
                <el-button type="primary">新建请购单</el-button>
              </router-link>
              <el-button type="danger" @click="del()" v-if="$_has8('add00')">删除</el-button>
            </li>
          </ul>
        </div>
      </div>
      <div class="table dis-flex" v-loading.lock="loading">
        <div class="admin-table dis-flex">
          <el-checkbox-group v-model="checkList">
            <table class="admin-main-table">
              <thead>
              <tr>
                <th><el-checkbox label="序号" name="allCheck" @change="checkAllChange"></el-checkbox></th>
                <th v-for="value in thead" :title="value">
                  {{value}}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in tbody">
                <td>
                  <el-checkbox :label="item.id">{{((conditions.pageNo - 1) * conditions.pageSize) + index + 1}}</el-checkbox>
                </td>
                <td class="router"><span @click="detail(item.id)">{{item.reqNo}}</span></td>
                <td>{{item.empName}}</td>
                <td>{{item.deptName}}</td>
                <td>{{unixFormat(item.reqTime)}}</td>
                <td>{{item.reviewEmpName }}</td>
                <td>{{item.reviewDeptName}}</td>
                <td>{{unixFormat(item.reviewTime)}}</td>
                <td>{{unixFormat(item.addTime)}}</td>
                <td>{{item.stcodeName}}</td>
                <td>
                  <el-button type="warning" v-if="item.stcode == 10 && $_has8('review01')" @click="review(item.id)">审核</el-button>
                  <el-button type="primary" v-if="item.stcode == 30 && $_has8('sub02')" @click="buildPurchase(item.id)">生成采购单</el-button>
                  <!--<el-button type="success" v-if="item.stcode == 50">已生成</el-button>-->
                </td>
              </tr>
              <tr v-if="tbody.length==0 && !loading">
                  <td :colspan="thead.length + 1" class="nothing-data">暂无数据</td>
              </tr>
              </tbody>
            </table>
          </el-checkbox-group>
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
        thead: ['请购编号', '请购人', '请购人部门', '请购时间', '审核人', '审核人部门', '审核时间', '生成时间', '请购状态', '操作'],
        tbody: [],
        checkList: [],
        ids: [],
        screening: [
          [
            {
              label: '请购单编号',
              type: 'input',
              field: 'reqNo',
            },
            {
              label: '请购状态',
              type: 'select',
              field: 'stcode',
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
        checkAll: false,
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
        this.permissions.getList = this.$_hasMulti8('get00,get01,get02,get03');
        if (this.permissions.getList) {
          this.loading = true;
          Purchase.reqList(val).then(res => {
            this.loading = false;
            this.paginationData = res.data;
            this.tbody = res.data.result;
            this.conditions.pageSize = res.data.pageSize;
            this.conditions.pageNo = res.data.page;
          }).catch(err => {
            console.log(err);
          });
        }
        Assistant.reqStcode()
          .then(res => {
            this.screening[0][1].data = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
      review: function (id) {
        Purchase.reqReview(id)
          .then(res => {
            console.log('res', res);
            this.$message({
              message: '审核成功',
              type: 'success',
            });
            this.init();
          })
          .catch(err => {
            console.log(err);
          });
      },
      buildPurchase: function (id) {
        Purchase.reqBuildPur(id)
          .then(res => {
            console.log('res', res);
            this.$message({
              message: '已生成采购单',
              type: 'success',
            });
            this.init();
          })
          .catch(err => {
            console.log(err);
          });
      },
      checkAllChange(val) {
        if (val.target.checked) {
          const arry = [];
          this.tbody.forEach((item) => {
            arry.push(item.id);
          });
          this.checkList = [...arry, '序号'];
        } else {
          this.checkList = [];
        }
      },
      getCheckList: function () {
        const index = this.checkList.indexOf('序号');
        if (index > -1) {
          this.checkList.splice(index, 1);
        }
      },
      del: function () {
        this.getCheckList();
        if (this.checkList.length === 0) {
          this.$message({
            message: '请先选择一项',
            type: 'error',
          });
        } else {
          let data = [];
          Purchase.reqList().then(res => {
            data = res.data.result.filter((item) => {
              return this.checkList.includes(item.id);
            });
            const stcode = [];
            data.forEach(state => {
              stcode.push(state.stcode);
            });
            if (stcode.toString().includes(30) ||
              stcode.toString().includes(50)) {
              this.$message({
                message: '只能删除未审核请购单',
                type: 'error',
              });
            } else {
              Purchase.reqDel(this.checkList.toString())
                .then(respons => {
                  console.log(respons);
                  this.$message({
                    message: '删除成功',
                    type: 'success',
                  });
                  this.init();
                })
                .catch(err => {
                  this.$message({
                    message: err.msg,
                    type: 'error',
                  });
                });
            }
          }).catch(err => {
            console.log(err);
          });
        }
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
        this.$router.push(`/purchase/requisition/detail/${val}`);
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
