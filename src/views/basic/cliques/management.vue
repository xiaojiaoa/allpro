<template>
  <div class="dis-flex container" v-loading.lock="loadingOrgan">
    <div class="dis-flex">
      <div>
        <div class="page-oper">
          <div class="page-title">{{name}}</div>
          <ul class="page-methods">
            <li>
              <el-button @click="role()">角色管理</el-button>
            </li>
            <li>
              <el-button @click="changeType()" :class="{'el-button--primary': type === 'store'}">门店管理</el-button>
            </li>
            <li>
              <el-button @click="changeType()" :class="{'el-button--primary': type === 'organ'}">机构管理</el-button>
            </li>
          </ul>
        </div>
      </div>
      <div class="dis-flex">
        <cliquesHeader :type="type" :id="cliques" @choose="chooseOrgan"></cliquesHeader>
        <div class="crumb">
          <span>{{organizationName}}</span><span v-for="item in reverseDeptName"> / {{item.name}}</span>{{organization === 0 ? '' : ' / 员工列表'}}
        </div>
        <div class="dis-flex">
          <el-row class="dis-flex direction-row">
            <transition name="fade">
              <el-col :span="3" class="organ" v-if="organization !== 0">
                <cliquesLeft :type="type" :id="organization" @choose="chooseDepart"></cliquesLeft>
              </el-col>
            </transition>
            <transition name="fade">
              <el-col :span="21" class="main dis-flex" v-if="organization !== 0">
                <cliquesMain :type="type" :bid="organization" :did="department"></cliquesMain>
              </el-col>
            </transition>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cliquesHeader from '../../../components/cliques/cliquesHeader.vue';
import cliquesLeft from '../../../components/cliques/cliquesLeft.vue';
import cliquesMain from '../../../components/cliques/cliquesMain.vue';
import { Organization } from '../../../services/admin';

export default {
  data() {
    return {
      loadingOrgan: true,
      cliques: this.$route.params.id || 0,
      name: '',
      type: 'organ',
      organization: 0,
      organizationName: '',
      department: 0,
      departmentName: '',
    };
  },
  created() {
    Organization.detail(this.$route.params.id).then(res => {
      this.name = res.data.name;
      this.loadingOrgan = false;
    }).catch(err => {
      console.log(err);
    });
  },
  methods: {
    changeType: function () {
      const self = this;
      if (self.type === 'organ') {
        self.type = 'store';
        self.organization = 0;
        self.organizationName = '';
        self.department = 0;
        self.departmentName = '';
      } else {
        self.type = 'organ';
        self.organization = 0;
        self.organizationName = '';
        self.department = 0;
        self.departmentName = '';
      }
    },
    chooseOrgan: function (val) {
      const self = this;
      self.organization = val.id;
      self.organizationName = val.name;
      self.department = '';
      self.departmentName = '';
    },
    chooseDepart: function (val) {
      const self = this;
      self.department = val[0].id;
      self.departmentName = val;
    },
  },
  computed: {
    reverseDeptName: function () {
      return this.departmentName !== '' ? this.departmentName.reverse() : '';
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  .organ{
    margin-right: 16px;
    width: 160px;
    border: 1px solid #dce2e5;
  }
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
  .crumb{
    height: 13px;
    font-size: 14px;
    letter-spacing: 0px;
    color: #999999;
    margin:30px 0;
  }
</style>
