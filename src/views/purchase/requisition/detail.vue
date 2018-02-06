<template>
  <div class="container dis-flex">
    <div class="page-oper">
      <div class="page-title">请购详情</div>
    </div>
    <div class="default-detail" v-loading.lock="loading">
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">请购单号</el-col>
          <el-col :span="16">{{data.id}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">请购人</el-col>
          <el-col :span="16">{{data.empName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">请购人部门</el-col>
          <el-col :span="16">{{data.deptName}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">请购时间</el-col>
          <el-col :span="16">{{unixFormat(data.reqTime)}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">审核人</el-col>
          <el-col :span="16">{{data.reviewEmpName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">审核人部门</el-col>
          <el-col :span="16">{{data.reviewDeptName}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">审核时间</el-col>
          <el-col :span="16">{{unixFormat(data.reviewTime)}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">生成时间</el-col>
          <el-col :span="16">{{unixFormat(data.addTime)}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">请购状态</el-col>
          <el-col :span="16">{{data.stcodeName}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">操作</el-col>
          <el-col :span="16">
            <el-button type="primary" v-if="data.stcode == 10" @click="review(data.id)">审核</el-button>
            <el-button type="success" v-if="data.stcode == 30">生成采购单</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <div class="page-oper">
      <div class="page-title">请购清单
      </div>
      <ul class="page-methods">
        <li>
          <el-button type="primary" @click="openSupp" v-if="data.stcode >= 30">上传供应商文件</el-button>
          <el-button v-if="data.reqType == 30" type="primary" @click="editSupplier">修改供应商</el-button>
        </li>
      </ul>
    </div>
    <div class="default-detail no-bot-border" v-loading.lock="loading">
      <div class="admin-table">
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
            <template>
              <tr v-for="(item,index) in reqData">
                <td>
                  {{((conditions.pageNo - 1) * conditions.pageSize) + index + 1}}
                </td>
                <td>{{item.mateNo}}</td>
                <td>{{item.mateName}}</td>
                <td v-if="data.reqType == 30" style="width: 200px !important">
                  <el-select v-model="item.suppId" placeholder="请选择供应商" size="small">
                    <el-option v-for="data in item.suppMaterials" :label="data.name" :value="data.id" :key="data.id"></el-option>
                  </el-select>
                </td>
                <td v-else>{{item.suppName}}</td>
                <td>{{item.num}}</td>
                <td>{{item.unitName}}</td>
              </tr>
            </template>
            </tbody>
          </table>
      </div>
    </div>
    <el-dialog title="上传供应商文件" v-model="dialogSupplier" :close-on-click-modal="false" :before-close="resetSupp" custom-class="purchaseDialog">
      <el-form  ref="form" label-width="140px">
        <el-row v-for="(data,index) in fileData" :key="index">
          <el-col :span="10">
            <el-form-item :label="data.suppName">
                <el-col :span="24" >
                  <el-input  :disabled="true" v-model="fileNames[index]"></el-input>
                </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="">
              <el-col :span="24" >
                <el-upload
                  class="uploader"
                  :action="action"
                  :on-success="handleFileSuccess"
                  :headers="accessToken"
                  :show-file-list="false">
                  <el-button size="small" type="primary" class="my-button" @click="button(index)">点击上传</el-button>
                </el-upload>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="文件名:">
              <el-col :span="24" >
                <label>{{data.suppFile ? data.suppFile.fileName : '' }}</label>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="uploadFile">确认</el-button>
        <el-button @click="resetSupp">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Purchase } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      thead: ['物料编号', '物料名称', '供应商名称', '数量', '单位'],
      currentIndex: 0,
      data: {},
      reqData: [],
      fileNames: {},
      fileData: [],
      accessToken: {
        'x-auth-token': '',
      },
      conditions: {
        pageSize: '',
        pageNo: '',
      },
      loading: true,
      dialogSupplier: false,
      action: Purchase.FileUpload,
    };
  },
  created() {
    this.init(this.$route.params.id);
    this.accessToken = {
      'x-auth-token': this.token,
    };
  },
  mixins: [mixins],
  methods: {
    init: function (val) {
      Purchase.reqDetail(val).then(res => {
        this.data = res.data;
        this.reqData = res.data.requestList;
        this.loading = false;
      }).catch(err => {
        console.log(err);
      });
    },
    openSupp: function () {
      this.dialogSupplier = true;
      Purchase.supFileData(this.$route.params.id).then(res => {
        this.fileData = res.data;
      }).catch(err => {
        console.log(err);
      });
    },
    resetSupp: function () {
      this.dialogSupplier = false;
      this.fileNames[this.currentIndex] = '';
    },
    handleFileSuccess(res) {
      this.$set(this.fileNames, `${this.currentIndex}`, res.data.name);
      this.fileData[this.currentIndex].path = res.data.url;
      this.fileData[this.currentIndex].fileName = res.data.name;
      this.$message({
        message: '上传成功',
        type: 'success',
      });
    },
    button(index) {
      this.currentIndex = index;
    },
    uploadFile: function () {
      const arr = {};
      arr.reqId = this.$route.params.id;
      arr.suppFiles = this.fileData;
      console.log('arr', arr);
      Purchase.supUpload(arr)
        .then(res => {
          console.log('res', res);
          this.$message({
            message: '上传成功',
            type: 'success',
          });
          this.$router.push('/purchase/requisition/list');
        })
        .catch(err => {
          console.log(err);
        });
    },

    review: function (id) {
      Purchase.reqReview(id)
        .then(res => {
          console.log('res', res);
          this.$message({
            message: '审核成功',
            type: 'success',
          });
          this.init(this.$route.params.id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    editSupplier: function () {
      const arr = {};
      arr.requestList = this.reqData;
      console.log(arr);
      Purchase.reqSuppEdit(arr)
        .then(res => {
          console.log(res);
          this.$message({
            message: '已生成采购单',
            type: 'success',
          });
          this.init(this.$route.params.id);
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  computed: {
    ...mapState('Global', ['token']),
  },
};
</script>

<style lang="scss" scoped>

</style>
