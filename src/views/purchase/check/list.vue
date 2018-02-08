<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div>
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title">检验单列表</div>
          <ul class="page-methods">
            <li>
              <el-button type="primary" @click="review" v-if="$_has8('review01')">审核</el-button>
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
              <td class="router"><span @click="detail(item.id)">{{item.checkNo}}</span></td>
              <td>{{item.receNo}}</td>
              <td>{{item.reviewEmpName}}</td>
              <td>{{unixFormat(item.reviewTime)}}</td>
              <td>{{item.stcodeName}}</td>
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
  import { Purchase } from '../../../services/admin';
  import mixins from '../../../components/mixins/base';

  export default {
    data() {
      return {
        thead: ['检验单编号', '收货单编号', '审核人姓名', '审核时间', '状态'],
        tbody: [],
        checkList: [],
        screening: [
          [
            {
              label: '检验单编号',
              type: 'input',
              field: 'checkNo',
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
        this.permissions.getList = this.$_hasMulti8('get00,get01,get02,get03');
        if (this.permissions.getList) {
          this.loading = true;
          Purchase.purCheckList(val).then(res => {
            this.loading = false;
            this.paginationData = res.data;
            this.tbody = res.data.result;
            this.conditions.pageSize = res.data.pageSize;
            this.conditions.pageNo = res.data.page;
          }).catch(err => {
            console.log(err);
          });
        }
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
        console.log(1, this.checkList);
      },
      getCheckList: function () {
        const index = this.checkList.indexOf('序号');
        if (index > -1) {
          this.checkList.splice(index, 1);
        }
      },
      review: function () {
        this.getCheckList();
        if (this.checkList.length === 0) {
          this.$message({
            message: '请先选择一项',
            type: 'error',
          });
        } else {
          let data = [];
          Purchase.purCheckList().then(res => {
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
                message: '只能审核未审核采购检验单',
                type: 'error',
              });
            } else {
              Purchase.purCheckReview(this.checkList.toString())
                .then(respons => {
                  console.log(respons);
                  this.$message({
                    message: '审核成功',
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
        this.$router.push(`/purchase/check/detail/${val}`);
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
          console.log('58878', this.permissions);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
