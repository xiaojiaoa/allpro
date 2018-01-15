<template>
  <div class="dis-flex container" v-loading.lock="loadingOrgan">
    <div class="dis-flex">
      <div>
        <div class="page-oper">
          <div class="page-title">{{name}}</div>
          <ul class="page-methods">
<!--             <li>
              <el-button @click="role()">角色管理</el-button>
            </li> -->
            <li>
              <el-button @click="changeType('store')" :class="{'el-button--primary': type === 'store'}">门店管理</el-button>
            </li>
            <li>
              <el-button @click="changeType('organ')" :class="{'el-button--primary': type === 'organ'}">机构管理</el-button>
            </li>
            <li v-if="$_has8('listOrderType')">
              <el-button @click="changeType('order')" :class="{'el-button--primary': type === 'order'}">订单类型管理</el-button>
            </li>
          </ul>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <div class="dis-flex">
          <!-- <cliquesHeader :type="type" :id="cliques" :bid="organization" @choose="chooseOrgan"></cliquesHeader> -->
          <transition name="fade" mode="out-in">
            <cliquesHeaderStore v-if="type === 'store'" :id="cliques" :bid="organization" @choose="chooseOrgan"></cliquesHeaderStore>
            <cliquesHeaderOrgan v-if="type === 'organ'" :id="cliques" :bid="organization" @choose="chooseOrgan"></cliquesHeaderOrgan>
            <cliquesHeaderOrder v-if="type === 'order'" :id="cliques"></cliquesHeaderOrder>
          </transition>
          <div class="crumb" v-if="type !== 'order'">
            <span>{{organizationName === '' ? name : organizationName}}</span><span v-for="item in reverseDeptName"> / {{item.name}}</span>{{organization === 0 ? '' : ' / 员工列表'}}
          </div>
          <div class="dis-flex" v-if="type !== 'order'">
            <el-row class="dis-flex direction-row">
              <transition name="fade">
                <el-col :span="3" class="organ" v-if="organization !== ''">
                  <cliquesLeft :type="type" :id="organization" :did="department" @choose="chooseDepart"></cliquesLeft>
                </el-col>
              </transition>
              <transition name="fade">
                <el-col :span="21" class="main dis-flex" v-if="organization !== ''">
                  <cliquesMain :type="type" :cliques="cliques" :bid="organization" :did="department"></cliquesMain>
                </el-col>
              </transition>
            </el-row>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// import cliquesHeader from '../../../components/cliques/cliquesHeader.vue';
import cliquesHeaderStore from '../../../components/cliques/cliquesHeaderStore.vue';
import cliquesHeaderOrgan from '../../../components/cliques/cliquesHeaderOrgan.vue';
import cliquesHeaderOrder from '../../../components/cliques/cliquesHeaderOrder.vue';
import cliquesLeft from '../../../components/cliques/cliquesLeft.vue';
import cliquesMain from '../../../components/cliques/cliquesMain.vue';
import { Organization } from '../../../services/admin';

export default {
  data() {
    return {
      loadingOrgan: true,
      cliques: this.$route.params.id,
      name: '',
      type: this.$route.query.type !== undefined ? this.$route.query.type : 'organ',
      organization: this.$route.query.bid !== undefined ?
        this.$route.query.bid : this.$route.params.id,
      organizationName: '',
      department: this.$route.query.did !== undefined ? this.$route.query.did : '',
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
    changeType: function (val) {
      const self = this;
      self.type = val;
      self.organization = '';
      self.organizationName = '';
      self.department = '';
      self.departmentName = '';
      if (val === 'organ') {
        self.organization = this.cliques;
      }
    },
    chooseOrgan: function (val) {
      const self = this;
      self.organization = val.id;
      self.organizationName = val.name;
      self.department = '';
      self.departmentName = '';
      console.log(self.organization);
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
    // cliquesHeader,
    cliquesHeaderStore,
    cliquesHeaderOrgan,
    cliquesHeaderOrder,
    cliquesLeft,
    cliquesMain,
  },
};
</script>
<style type="text/css">
  .fade-enter-active{
    transition: opacity 1s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  .fade-leave-active {
    transition: opacity 0s
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
  .addOrder{
    top: 30%!important;
    width: 594px!important;
  }
  .crumb{
    height: 13px;
    font-size: 14px;
    letter-spacing: 0px;
    color: #999999;
    margin:30px 0;
  }
</style>
