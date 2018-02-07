<template>
  <div class="container dis-flex">
    <div class="page-oper">
      <div class="page-title">供应商信息</div>
    </div>
    <div class="default-detail" v-loading.lock="loading">
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">供应商名称</el-col>
          <el-col :span="16">{{data.name}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">供应商分类名称</el-col>
          <el-col :span="16">{{data.cateName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">联系人姓名</el-col>
          <el-col :span="16">{{data.contact}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">联系人电话</el-col>
          <el-col :span="16">{{data.contactMobile}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">开户银行</el-col>
          <el-col :span="16">{{data.depositBank}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">开户卡号</el-col>
          <el-col :span="16">{{data.depositNo}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <!--<el-col :span="8">-->
          <!--<el-col :span="8" class="label">财务联系人</el-col>-->
          <!--<el-col :span="16">{{data.typeName}}</el-col>-->
        <!--</el-col>-->
        <!--<el-col :span="8">-->
          <!--<el-col :span="8" class="label">财务联系人手机</el-col>-->
          <!--<el-col :span="16">{{data.addressTypeName}}</el-col>-->
        <!--</el-col>-->
        <el-col :span="8">
          <el-col :span="8" class="label">开票信息</el-col>
          <el-col :span="16">{{data.invoiceInfo}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">交货方式</el-col>
          <el-col :span="16">{{data.deliveryTypeName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">供应商所在地区</el-col>
          <el-col :span="16">{{data.provinceStr}}-{{data.cityStr}}-{{data.distStr}}-{{data.address}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">备注</el-col>
          <el-col :span="16">{{data.remark}}</el-col>
        </el-col>
      </el-row>
    </div>

    <div class="page-oper">
      <div class="page-title">供货信息</div>
      <ul class="page-methods">
        <li>
          <router-link :to="{path: '/purchase/supplier/offerProduct', query: {sid: data.id}}">
            <el-button type="primary" icon="edit">添加可提供物料</el-button>
          </router-link>
          <router-link :to="{path: '/purchase/purchases/list', query: {suppId: data.id}}">
            <el-button type="primary" icon="view">查看采购单</el-button>
          </router-link>
          <el-button type="primary" icon="delete" @click="delRelation">解除关联</el-button>
        </li>
      </ul>
    </div>
    <div class="default-detail no-bot-border" v-loading.lock="loading">
      <div class="admin-table">
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
            <template>
              <tr v-for="(item,index) in materialData">
                <td>
                  <el-checkbox :label="item">{{((conditions.pageNo - 1) * conditions.pageSize) + index + 1}}</el-checkbox>
                </td>
                <td>{{item.mateNo}}</td>
                <td>{{item.mateTypeName}}</td>
                <td>{{item.mateName}}</td>
                <td>{{unixFormat(item.endDate)}}</td>
                <td>
                  <el-button type="primary" @click="openDialog(item.id, unixFormat(item.endDate))">修改日期</el-button>
                </td>
              </tr>
            </template>
            </tbody>
          </table>
        </el-checkbox-group>
      </div>
    </div>

    <el-dialog title="修改日期" v-model="dialogMod" :close-on-click-modal="false" :before-close="resetMod">
      <el-form :model="modData"  ref="modData" label-width="140px">
        <el-row>
          <el-col :span="20">
            {{modData.endDate}}
            <el-form-item  label="截止日期" prop="endDate" :rules="{ required: true, message: '请输入截止日期', trigger: 'blur' }">
              <el-date-picker
                v-model="modData.endDate"
                type="date"
                placeholder="选择截止日期"
                @input="dateformat('endDate')"
                format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="editDate('modData')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { Purchase } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      thead: ['物料编号', '物料分类名称', '物料名称', '截止有效日期', '操作'],
      data: {},
      materialData: {},
      checkList: [],
      modData: {
        id: '',
        endDate: '',
      },
      dialogMod: false,
      conditions: {
        pageSize: '',
        pageNo: '',
      },
      loading: true,
    };
  },
  created() {
    this.init(this.$route.params.id);
  },
  mixins: [mixins],
  methods: {
    init: function (val) {
      Purchase.supDetail(val).then(res => {
        this.data = res.data;
        this.materialData = res.data.suppMaterials;
        this.loading = false;
      }).catch(err => {
        console.log(err);
      });
    },
    openDialog: function (id, date) {
      this.dialogMod = true;
      this.modData.id = id;
      this.modData.endDate = date;
    },
    resetForm: function () {
      this.modData = {
        id: '',
        endDate: '',
      };
      this.dialogMod = false;
    },
    resetMod() {
      this.resetForm('mod');
    },
    dateformat: function (key) {
      this.modData[`${key}`] = this.dateFormat(this.modData[`${key}`]);
    },
    editDate: function (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          Purchase.supMateEdit(this.modData)
            .then(res => {
              console.log('res', res);
              this.$message({
                message: '修改成功',
                type: 'success',
              });
              this.resetForm();
              this.init(this.$route.params.id);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log('error submit!!');
        }
      });
    },
    delRelation: function () {
      const arr = {};
      this.checkList.forEach(state => {
        state.suppId = this.$route.params.id;
      });
      arr.list = this.checkList;
      if (this.checkList.length === 0) {
        this.$message({
          message: '请先选择一项',
          type: 'error',
        });
      } else {
        Purchase.supMateDel({ data: arr })
          .then(res => {
            console.log('res', res);
            this.$message({
              message: '解除成功',
              type: 'success',
            });
            this.init(this.$route.params.id);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
