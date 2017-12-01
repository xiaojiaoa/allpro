<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div>
        <div class="page-oper">
          <div class="page-title">{{name}}</div>
          <ul class="page-methods">
            <li>
              <el-button @click="role()">角色管理</el-button>
            </li>
            <li>
              <el-button @click="changeType()">{{type === 'organ' ? '门店管理' : '机构管理'}}</el-button>
            </li>
          </ul>
        </div>
      </div>
      <div class="dis-flex">
        <cliquesHeader :type="type" :id="cliques" @choose="chooseOrgan"></cliquesHeader>
        <div class="dis-flex">
          <el-row class="dis-flex direction-row">
            <el-col :span="3" class="organ">
              <cliquesLeft :type="type" :id="organization" @choose="chooseDepart"></cliquesLeft>
            </el-col>
            <el-col :span="21" class="main dis-flex">
              <cliquesMain :type="type" :bid="organization" :did="department"></cliquesMain>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cliquesHeader from '../../../components/cliquesHeader.vue';
import cliquesLeft from '../../../components/cliquesLeft.vue';
import cliquesMain from '../../../components/cliquesMain.vue';
import { Organization } from '../../../services/admin';

export default {
  data() {
    return {
      cliques: this.$route.params.id || 0,
      name: '',
      type: 'organ',
      organization: 0,
      department: 0,
    };
  },
  created() {
    Organization.detail(this.$route.params.id).then(res => {
      this.name = res.data.name;
    }).catch(err => {
      console.log(err);
    });
  },
  methods: {
    changeType: function () {
      if (this.type === 'organ') {
        this.type = 'store';
      } else {
        this.type = 'organ';
      }
    },
    chooseOrgan: function (val) {
      const self = this;
      self.organization = val;
      self.department = '';
    },
    chooseDepart: function (val) {
      const self = this;
      self.department = val;
    },
  },
  components: {
    cliquesHeader,
    cliquesLeft,
    cliquesMain,
  },
};
</script>
<style type="text/css">
  .page-oper{
    margin-top: 0;
  }
  .page-oper .page-title{
    margin-right: 60px;
  }
  .el-pagination span{
    background-color: #fff;
  }
  .el-dialog__body{
    padding: 30px 60px 30px 30px;
  }
  .addOrgan{
    top: 10%!important;
    width: 1100px!important;
  }
</style>
