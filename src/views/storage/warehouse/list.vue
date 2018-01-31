<template>
  <div class="dis-flex container">
    <div class="dis-flex"> 
      <div class="list-option">
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title">仓库列表</div>
          <ul class="page-methods">
            <li v-if=" $_hasMulti8('add99,add98,add97')">
              <el-button type="primary" @click="routerLink('/storage/warehouse/edit')">新建仓库</el-button>
            </li>
          </ul>
        </div>
      </div>
      <div class="dis-flex" v-loading.lock="loading">
        <div class="table dis-flex">
          <div class="admin-table dis-flex">
            <el-checkbox-group v-model="checkList">
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
                      {{((conditions.pageNo - 1) * conditions.pageSize) + index + 1}}
                    </td>
                    <td class="router"><span @click="routerLink(`/storage/warehouse/detail/${item.whseId}`)">{{item.whseCode}}</span></td>
                    <td>{{item.name}}</td>
                    <td>{{item.cliqueName}}</td>              
                    <td>{{item.orgName}}</td>
                    <td>{{item.typeName}}</td>
                    <td>{{ item.stcodeName }}</td>
                    <td>
                       <el-button type="primary" v-if="item.stcode === 1" @click="routerLink(`/storage/region/edit/${item.whseId}`)">新建区域仓库</el-button>
                       <el-button type="success" v-if="item.stcode === 1" @click="routerLink(`/storage/region/list?whseId=${item.whseId}`)">区域仓库列表</el-button>
                        <el-button type="primary" v-if="item.stcode === 1 && $_hasMulti8('edit99,edit98,edit97')" @click="routerLink(`/storage/warehouse/edit/${item.whseId}`)">修改</el-button>
                       <el-button type="success" v-if="item.stcode === 1 && $_hasMulti8('isAble99,isAble98,isAble97')" @click="disable(item.whseId)">禁用</el-button>
                       <el-button type="success" v-if="item.stcode === 0 && $_hasMulti8('isAble99,isAble98,isAble97')" @click="enable(item.whseId)">启用</el-button>
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
  </div>
</template>

<script>
import screening from '../../../components/screening.vue';
import { Storage } from '../../../services/admin';

export default {
  data() {
    return {
      thead: ['仓库编号', '仓库名称', '所属集团', '所属机构', '仓库类型', '状态', '操作'],
      tbody: [],
      screening: [
        [
          {
            label: '仓库编号',
            type: 'input',
            field: 'whseId',
          },
          {
            label: '仓库名称',
            type: 'input',
            field: 'name',
          },
        ],
      ],
      loading: true,
      paginationData: {},
      checkList: [],
      conditions: {
        pageSize: '',
        pageNo: '',
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init: function (val) {
      this.loading = false;
      Storage.storageList(val).then(res => {
        this.loading = false;
        this.paginationData = res.data;
        this.tbody = res.data.result;
        console.log('tbody', this.tbody);
        this.conditions.pageSize = res.data.pageSize;
        this.conditions.pageNo = res.data.page;
      }).catch(err => {
        console.log(err);
      });
    },
    disable(code) {
      this.$confirm('确认禁用该仓库?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        Storage.storageDisable({ whseId: code })
          .then(() => {
            this.$message({
              type: 'success',
              message: '禁用成功!',
            });
            this.loading = true;
            this.init();
          })
          .catch(err => {
            console.log(err);
            this.$message.error(`${err.msg}`);
          });
      });
    },
    enable(code) {
      this.$confirm('确认启用该仓库?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        Storage.storageEnable({ whseId: code })
          .then(() => {
            this.$message({
              type: 'success',
              message: '启用成功!',
            });
            this.loading = true;
            this.init();
          })
          .catch(err => {
            console.log(err);
            this.$message.error(`${err.msg}`);
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
    routerLink: function (val) {
      this.$router.push(`${val}`);
    },
  },
  computed: {
    conditionsWatch: function () {
      return this.paginationData.page;
    },
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
  },
};
</script>

<style lang="scss" scoped>

</style>
