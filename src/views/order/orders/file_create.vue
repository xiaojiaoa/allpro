<template>
  <div class="container">
    <template v-if="fileType.length !== 0 && $_has8('upFile01') && $route.params.stcode !== 120">
    <div class="page-oper" style="margin-bottom:20px">
      <div class="page-title">文件上传</div>
      <span>订单号：{{orderDetail.tno}}</span>
    </div>
    <div class="container" >
        <el-form ref="fileForm" :model="file"  :rules="rules" label-width="140px" >
          <el-row>
            <el-col :span="8">
              <el-form-item  label="文件类型" prop="fileTypeId">
                <el-radio v-model="file.fileTypeName" :label="file.fileTypeName"></el-radio>
              </el-form-item>
            </el-col>
          </el-row>
        
          <el-row>
            <el-col :span="16">
              <el-form-item label="备注" prop="remark">
                <el-col :span="24">
                  <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="file.remark"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          
           <el-row>
            <el-col :span="16">
              <el-form-item label="文件地址" prop="savePath">
                <el-col :span="21">
                  <el-input v-model="file.savePath" readonly></el-input>
                </el-col>
                <el-col :span="1" class="blank"></el-col>
                <el-col :span="2" class="text-right">
                  <el-upload
                    class="avatar-uploader"
                    :action="action"
                    :data="uploadParams"
                    :headers="accessToken"
                    :on-success="upLoadSuccess"
                    :on-progress="upLoadProgress"
                    :show-file-list="false">
                  <el-button size="small" type="primary" class="my-button" :loading="upload">上传文件</el-button>
                </el-upload>
                </el-col>
              </el-form-item>
              </el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" @click="onSubmit('fileForm')" class="my-button" :loading="request">确认添加</el-button>
            <el-button @click="returnList" class="my-button">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <div class="page-oper">
      <div class="page-title">相关文件</div>
      <ul class="page-methods">
      </ul>
    </div>
    <div class="default-detail" v-loading.lock="loading">
      <div class="admin-table">
        <el-checkbox-group>
          <table class="admin-main-table">
            <thead>
              <tr>
                <th v-for="value in relatedFilesThead" :title="value">
                  {{value}}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in relatedFilesTbody">                                
                <td>{{item.orderFileReturnVo.tno}}</td>
                <td>{{item.orderFileReturnVo.fileName}}</td>              
                <td>{{item.orderFileReturnVo.name}}</td>
                <td>{{unixFormat(item.orderFileReturnVo.createTime)}} {{dateTimeFormat(item.orderFileReturnVo.createTime)}}</td>
                <td>{{item.orderFileReturnVo.uploadEmp.name}}</td>
                <td>{{item.orderFileReturnVo.remark}}</td>
                <td class="operation">
                   <el-button v-if="$_has8('downFile01')" type="primary">
                      <a :href="`${static}/download?originalFileName=${item.orderFileReturnVo.fileName}&url=${item.orderFileReturnVo.savePath}`" :download="`${item.orderFileReturnVo.fileName}`">下载</a>
                   </el-button>                          
                   <el-button  type="danger" @click="delFile(item.orderFileReturnVo.tid)" v-if="item.orderFileReturnVo.delFlag && $_has8('delFile01')">删除</el-button> 
                </td> 
              </tr>
            </tbody>
          </table>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Order, Assistant } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      action: Assistant.fileupload,
      static: Assistant.static,
      accessToken: { 'x-auth-token': this.token },
      orderDetail: {},
      relatedFilesThead: ['订单号', '文件名', '文件类型', '上传时间', '上传员工', '备注', '操作'],
      relatedFilesTbody: [],
      fileType: [],
      uploadParams: {
        lid: this.$route.params.lid,
        tid: this.$route.params.tid,
      },
      file: {
        lid: this.$route.params.lid,
        tid: this.$route.params.tid,
        fileName: '',
        fileTypeId: '',
        fileTypeName: '',
        savePath: '',
        type: '',
        remark: '',
      },
      rules: {
        savePath: [
          { required: true, message: '请先上传文件' },
        ],
        fileTypeId: [
          { required: true },
        ],
      },
      loading: true,
      request: false,
      upload: false,
    };
  },
  computed: {
    ...mapState('Global', ['employee', 'token']),
  },
  created() {
    this.accessToken = {
      'x-auth-token': this.token,
    };
    this.init(this.$route.params);
  },
  methods: {
    init(val) {
      this.loading = true;
      Promise.all([
        Order.orderAllFileInfo(val),
        Order.orderFileType(val.stcode),
        Order.orderDetail(val.tid),
      ])
        .then(([fileInfo, fileType, orderDetail]) => {
          this.loading = false;
          this.relatedFilesTbody = fileInfo.data;
          this.fileType = fileType.data;
          if (fileType.data.length !== 0) {
            this.file.fileTypeId = fileType.data[0].id;
            this.file.fileTypeName = fileType.data[0].name;
            this.file.type = fileType.data[0].code;
          }
          this.orderDetail = orderDetail.data.orderBasicInfo;
        })
        .catch(err => {
          console.log(err);
        });
    },
    upLoadSuccess(file) {
      this.upload = false;
      this.file.savePath = file.data.url;
      this.file.fileName = file.data.name;
    },
    upLoadProgress() {
      this.upload = true;
    },
    onSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.request = true;
          Order.addOrderFile(this.file).then(() => {
            this.$message({
              message: '提交成功',
              type: 'success',
            });
            this.returnList();
          }).catch(err => {
            console.log(err);
          }).finally(() => {
            this.request = false;
          });
        } else {
          console.log('error submit!!');
        }
      });
    },
    delFile(id) {
      this.$confirm('是否删除该文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        Order.delFileInfo(id)
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            this.init(this.$route.params);
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    returnList: function () {
      this.$router.go(-1);
    },
    routerLink: function (val) {
      this.$router.push(`${val}`);
    },
  },
  mixins: [mixins],
};
</script>
<style scoped>
 .operation .el-button span a{
    color: #ffffff;
 }
 .text-right{
  text-align: right;
}
</style>
