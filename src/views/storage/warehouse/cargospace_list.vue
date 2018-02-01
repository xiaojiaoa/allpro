<template>
  <div class="dis-flex container">
    <div class="dis-flex"> 
      <div class="list-option">
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title">货位列表</div>
          <ul class="page-methods">
            <li>
              <el-button type="primary" @click="routerLink(`/storage/cargospace/edit/${$route.query.whseId}/${$route.query.regionId}`)">新建货位</el-button>
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
                    <td>{{item.whseName}}</td>
                    <td>{{item.regionName}}</td>
                    <td class="router"><span @click="routerLink(`/storage/cargospace/detail/${item.spaceId}`)">{{item.spaceCode}}</span></td>
                    <td>{{item.cliqueName}}</td>              
                    <td>{{item.orgName}}</td>
                    <td>{{item.weight}}</td>
                    <td>{{item.amount}}</td>
                    <td>{{ item.usableName }}</td>
                    <td>{{ item.offShelivesName }}</td>
                    <td>
                    <el-button type="primary" v-if="item.stcode === 1" @click="routerLink(`/storage/cargospace/edit/${item.spaceId}`)">修改</el-button>
                       <el-button type="success" v-if="item.stcode === 1" @click="disable(item.spaceId)">禁用</el-button>
                       <el-button type="success" v-if="item.stcode === 0" @click="enable(item.spaceId)">启用</el-button>
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
      thead: ['所属仓库', '所属区域', '货位编号', '所属集团', '所属机构', '最大承重(kg)', '最大存货数量', '是否可用', '是否上架', '操作'],
      tbody: [],
      screening: [
        [
          {
            label: '仓库区域',
            type: 'regionId',
            field: 'regionId',
            data: [],
          },
          {
            label: '仓库区域',
            type: 'input',
            field: 'regionId',
          },
          {
            label: '货位号',
            type: 'input',
            field: 'spaceId',
          },
        ],
      ],
      loading: true,
      paginationData: {},
      checkList: [],
      conditions: {
        pageSize: '',
        pageNo: '',
        whseId: this.$route.query.whseId,
        regionId: this.$route.query.regionId,
      },
    };
  },
  created() {
    this.init(this.$route.query);
  },
  methods: {
    init: function (val) {
      this.loading = false;
      Promise.all([Storage.cargospaceList(val), Storage.regionsList()])
        .then(([res, list]) => {
          this.loading = false;
          this.paginationData = res.data;
          this.tbody = res.data.result;
          this.conditions.pageSize = res.data.pageSize;
          this.conditions.pageNo = res.data.page;
          this.screening[0][0].data = list.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    disable(code) {
      this.$confirm('确认禁用该货位?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        Storage.cargospaceDisable({ spaceId: code })
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
      this.$confirm('确认启用该货位?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        Storage.cargospaceEnable({ spaceId: code })
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
        if (Object.keys(val).regionId !== '') {
          this.$router.push(`/storage/cargospace/list?whseId=${this.$route.query.whseId}&regionId=${this.conditions.regionId}`);
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
