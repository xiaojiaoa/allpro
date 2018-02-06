<template>
  <div class="container">
    <div class="page-oper">
      <div class="page-title">货位详情</div>
      <ul class="page-methods">
        <li v-if="isEdit">
          <el-button type="primary" icon="edit" @click="routerLink(`/storage/cargospace/edit/${$route.params.spaceId}`)">修改</el-button>
        </li>
      </ul>
    </div>
    <div class="default-detail" v-loading.lock="loading">
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">货位编号</el-col>
          <el-col :span="16">{{data.spaceCode}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">所属区域</el-col>
          <el-col :span="16">{{data.regionName}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">所属仓库</el-col>
          <el-col :span="16">{{data.whseName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">所属集团</el-col>
          <el-col :span="16">{{data.cliqueName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">所属机构</el-col>
          <el-col :span="16">{{data.orgName}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">最大承受重量(kg)</el-col>
          <el-col :span="16">{{data.maxWeight}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">最大数量</el-col>
          <el-col :span="16">{{data.maxAmount}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">货架长宽高</el-col>
          <el-col :span="16">{{data.sizeLength}}*{{data.sizeWidth}}*{{data.sizeHeight}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">重量范围</el-col>
          <el-col :span="16">{{data.weightRange}}</el-col>
        </el-col>
        <el-col :span="16">
          <el-col :span="4" class="label">数量范围</el-col>
          <el-col :span="20">{{ data.amountRange}}</el-col>
        </el-col>
      </el-row>
       <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">备注</el-col>
          <el-col class="text el-8-9">{{data.remark}}</el-col>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Storage } from '../../../services/admin';

  export default {
    data() {
      return {
        data: {},
        loading: false,
        isEdit: false,
      };
    },
    created() {
      this.init(this.$route.params.spaceId);
    },
    methods: {
      init: function (val) {
        this.loading = true;
        const allcli = this.$_has8('edit99');
        const cli = this.$_has8('edit98');
        const org = this.$_has8('edit97');
        Storage.cargospaceDetail(val).then(res => {
          this.data = res.data;
          this.loading = false;
          if (
            org === true &&
            cli === false &&
            allcli === false &&
            res.data.orgId === this.employee.organId
          ) {
            this.isEdit = true;
          }
          if (allcli === true) {
            this.isEdit = true;
          }
          if (
            org === true &&
            cli === true &&
            allcli === false &&
            res.data.cliqueId === this.employee.cliqueId
          ) {
            this.isEdit = true;
          }
          if (
            org === false &&
            cli === true &&
            allcli === false &&
            res.data.cliqueId === this.employee.cliqueId
          ) {
            this.isEdit = true;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      routerLink: function (val) {
        this.$router.push(`${val}`);
      },
    },
    computed: {
      ...mapState('Global', ['employee']),
      cliqueIdWatch: function () {
        return this.employee;
      },
    },
    watch: {
      cliqueIdWatch: function (val) {
        if (val !== 0) {
          this.init(this.$route.params.id);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
