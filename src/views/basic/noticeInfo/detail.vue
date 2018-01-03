<template>
  <div class="container dis-flex">
    <div class="page-oper">
      <div class="page-title">公告信息</div>
      <ul class="page-methods">
        <li> 
            <el-button type="primary" icon="edit" @click="routerLink(`/basic/noticeInfo/edit/${id}`)" v-if="$_has8('edit00')">修改</el-button>
        </li>
        <li>
          <el-button type="danger" @click="open2()" v-if="$_has8('del0')">删除</el-button>
        </li>
      </ul>
    </div>
    <div class="default-detail">
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">发表人</el-col>
          <el-col :span="16">{{data.empName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">发表日期</el-col>
          <el-col :span="16">{{unixFormat(data.addTime)}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">公告类型</el-col>
          <el-col :span="16">{{data.typeName }}</el-col>
        </el-col>
      </el-row>
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">发表标题</el-col>
          <el-col class="text el-8-9">
            {{data.title}}
          </el-col>
        </el-col>
      </el-row>
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">发表内容</el-col>
          <el-col class="text el-8-9">
            {{data.content}}
          </el-col>
        </el-col>
      </el-row>
      <template v-for="(item, index) in data.docAdjuncts" v-key="index">
          <el-row class="textarea">
            <el-col>
              <el-col class="label el-1-9">附件{{index + 1}}</el-col>
              <el-col class="text el-8-9">
                {{data.name}}
              </el-col>
            </el-col>
          </el-row>
      </template>
    </div>
  </div>
</template>

<script>
  import { NoticeInfo } from '../../../services/admin';
  import mixins from '../../../components/mixins/base';

  export default {
    data() {
      return {
        data: {},
      };
    },
    created() {
      this.init(this.$route.params.id);
    },
    mixins: [mixins],
    methods: {
      init: function (val) {
        NoticeInfo.detail(val).then(res => {
          this.data = res.data;
          this.id = this.$route.params.id;
        }).catch(err => {
          console.log(err);
        });
      },
      open2() {
        this.$confirm('确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          type: 'warning',
        }).then(() => {
          NoticeInfo.delete(this.$route.params.id)
            .then(() => {
              this.$message({
                message: '删除成功',
                type: 'success',
              });
              this.$router.push('/basic/noticeInfo/list');
            })
            .catch(err => {
              console.log('err', err);
            });
        });
      },
      routerLink(val) {
        this.$router.push(`${val}`);
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
