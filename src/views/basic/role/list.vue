<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div>
        <div class="page-oper">
          <div class="page-title">默认角色</div>
          <ul class="page-methods">
            <li>
              <el-button type="primary" @click="edit()">新建角色</el-button>
            </li>
          </ul>
        </div>
      </div>
      <div class="table dis-flex">
        <div class="admin-table dis-flex">
            <table class="admin-main-table">
              <thead>
              <tr>
                <th v-for="value in thead" :title="value">
                  {{value}}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in tbody">
                <td>{{item.name}}</td>
                <td>{{item.name}}</td>
                <td>
                  <el-button type="primary">修改</el-button>
                  <el-button type="danger">删除</el-button>
                </td>
              </tr>
              </tbody>
            </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Role } from '../../../services/admin';

  export default {
    data() {
      return {
        thead: ['角色', '权限', '操作'],
        tbody: [],
        paginationData: {},
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
        Role.list(val).then(res => {
          console.log(res.data);
          this.tbody = res.data;
        }).catch(err => {
          console.log(23333, err);
        });
      },
      detail: function (val) {
        this.$router.push(`/basic/stores/detail/${val}`);
      },
      edit: function () {
        this.$router.push('/basic/stores/edit');
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
