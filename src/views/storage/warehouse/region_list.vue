<template>
  <div class="dis-flex container">
    <div class="dis-flex"> 
      <div class="list-option">
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title">仓库区域列表</div>
          <ul class="page-methods">
            <li v-if="isAdd">
              <el-button type="primary" @click="routerLink(`/storage/region/edit/${$route.query.whseId}`)">新建区域仓库</el-button>
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
                    <td class="router"><span @click="routerLink(`/storage/region/detail/${item.whseId}/${item.regionId}`)">{{item.regionCode}}</span></td>
                    <td>{{item.name}}</td>
                    <td>{{item.whseName}}</td>
                    <td>{{item.cliqueName}}</td>              
                    <td>{{item.orgName}}</td>
                    <td>{{item.regionTypeName}}</td>
                    <td>{{item.cargoTypeName}}</td>
                    <td>{{item.stcodeName}}</td>
                    <td>
                       <!-- <el-button type="primary" v-if="item.stcode === 1" @click="routerLink(`/storage/cargospace/edit/${item.whseId}/${item.regionId}`)">新建货位</el-button> -->
                       <el-button type="success" v-if="item.stcode === 1" @click="routerLink(`/storage/cargospace/list?whseId=${item.whseId}&&regionId=${item.regionId}`)">查看所有货位</el-button>
                       <!-- <el-button type="primary" v-if="item.stcode === 1" @click="routerLink(`/storage/region/edit/${item.whseId}/${item.regionId}`)">修改</el-button> -->
                       <el-button type="success" v-if="item.stcode === 1 && isAble(item.cliqueId, item.orgId)" @click="disable(item.regionId)">禁用</el-button>
                       <el-button type="success" v-if="item.stcode === 0 && isAble(item.cliqueId, item.orgId)" @click="enable(item.regionId)">启用</el-button>
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
import { mapState } from 'vuex';
import screening from '../../../components/screening.vue';
import { Storage } from '../../../services/admin';

export default {
  data() {
    return {
      thead: ['区域编号', '区域名称', '所属仓库', '所属集团', '所属机构', '一级区域分类', '二级区域分类', '状态', '操作'],
      tbody: [],
      screening: [
        [
          {
            label: '仓库',
            type: 'selectWhseId',
            field: 'whseId',
            data: [],
            // defaultValue: parseInt(this.$route.query.whseId, 10),
          },
          {
            label: '区域编号',
            type: 'input',
            field: 'regionId',
          },
          {
            label: '区域名称',
            type: 'input',
            field: 'name',
          },
        ],
      ],
      loading: true,
      isAdd: false,
      paginationData: {},
      checkList: [],
      conditions: {
        pageSize: '',
        pageNo: '',
        whseId: this.$route.query.whseId,
      },
    };
  },
  created() {
    this.regionListPermit(this.$route.query);
    this.init(this.$route.query);
  },
  methods: {
    init: function (val) {
      this.loading = false;
      Promise.all([Storage.regionList(val), Storage.warehouseList()])
        .then(([res, list]) => {
          this.loading = false;
          this.paginationData = res.data;
          this.tbody = res.data.result;
          this.conditions.pageSize = res.data.pageSize;
          this.conditions.pageNo = res.data.page;
          this.screening[0][0].data = list.data;
          // this.screening[0][0].defaultValue = `${this.$route.query.whseId}`;
        })
        .catch(err => {
          console.log(err);
        });
    },
    regionListPermit(val) {
      const allcli = this.$_has8('add99');
      const cli = this.$_has8('add98');
      const org = this.$_has8('add97');
      Storage.storageList(val)
        .then(res => {
          if (
            org === true &&
            cli === false &&
            allcli === false &&
            res.data.result[0].orgId === this.employee.organId
          ) {
            this.isAdd = true;
          }
          if (allcli === true) {
            this.isAdd = true;
          }
          if (
            org === true &&
            cli === true &&
            allcli === false &&
            res.data.result[0].cliqueId === this.employee.cliqueId
          ) {
            this.isAdd = true;
          }
          if (
            org === false &&
            cli === true &&
            allcli === false &&
            res.data.result[0].cliqueId === this.employee.cliqueId
          ) {
            this.isAdd = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    isAble(cliqueId, organId) {
      const allcli = this.$_has8('isAble99');
      const cli = this.$_has8('isAble98');
      const org = this.$_has8('isAble97');
      if (
        org === true &&
        cli === false &&
        allcli === false &&
        organId === this.employee.organId
      ) {
        return true;
      }
      if (allcli === true) {
        return true;
      }
      if (
        org === true &&
        cli === true &&
        allcli === false &&
        cliqueId === this.employee.cliqueId
      ) {
        return true;
      }
      if (
        org === false &&
        cli === true &&
        allcli === false &&
        cliqueId === this.employee.cliqueId
      ) {
        return true;
      }
      return false;
    },
    disable(code) {
      this.$confirm('确认禁用该仓库区域?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        Storage.regionDisable({ regionId: code })
          .then(() => {
            this.$message({
              type: 'success',
              message: '禁用成功!',
            });
            this.loading = true;
            this.init(this.$route.query);
          })
          .catch(err => {
            console.log(err);
            this.$message.error(`${err.msg}`);
          });
      });
    },
    enable(code) {
      this.$confirm('确认启用该仓库区域?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        Storage.regionEnable({ regionId: code })
          .then(() => {
            this.$message({
              type: 'success',
              message: '启用成功!',
            });
            this.loading = true;
            this.init(this.$route.query);
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
        if (Object.keys(val).whseId !== '') {
          this.$router.push(`/storage/region/list?whseId=${this.conditions.whseId}`);
        }
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
    ...mapState('Global', ['employee']),
    conditionsWatch: function () {
      return this.paginationData.page;
    },
    cliqueIdWatch: function () {
      return this.employee;
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
    cliqueIdWatch: function (val) {
      if (val !== 0) {
        this.regionListPermit(this.$route.query);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
