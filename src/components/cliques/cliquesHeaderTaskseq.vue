<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div>
        <div class="page-oper">
          <div class="page-title">流水类型列表</div>
          <ul class="page-methods">
            <li>
              <el-button type="primary" @click="add">新增</el-button>
            </li>
            <li>
              <el-button type="primary" @click="deleteStorage">清除缓存</el-button>
            </li>
          </ul>
        </div>
      </div>
      <div class="dis-flex z1-table" v-loading.lock="loading">
        <div class="table dis-flex">
          <div class="admin-table dis-flex">
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
                  {{index + 1}}
                </td>
                <td class="router"><span @click="detail(item.id)">{{item.name}}</span></td>
                <td>{{item.moduleNamesStr}}</td>
                <td>{{unixFormat(item.createTime)}}</td>
                <td>
                  <el-button type="danger" v-if="item.state === 1" @click="deleteType(item.id)">禁用</el-button>
                  <el-button type="success" v-else>启用</el-button>
                </td>
              </tr>
              <tr v-if="tbody.length==0 && !loading">
                <td :colspan="thead.length + 1" class="nothing-data">暂无数据</td>
              </tr>
              </tbody>
            </table>
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
    <el-dialog title="新建流水类型" :visible.sync="dialogShow" custom-class="addOrder" :before-close="resetDialog">
      <el-form :model="form" ref="form" :rules="rules" label-width="140px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="流水类型名称" class="required" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="任务流水处理器" prop="procId">
              <el-select v-model="form.procId" placeholder="请选择">
                <el-option
                  v-for="item in procsList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="流程" prop="taskflowTypeModuleSaveDTOList">
              <el-checkbox-group v-model="form.taskflowTypeModuleSaveDTOList">
                <el-checkbox v-for="item in modulesList" :label="item" :key="item.id">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">取消</el-button>
        <el-button type="primary" @click="onSubmitOrder('form')">确定</el-button>
      </div>
    </el-dialog>
  </div> 
</template>
<script type="text/javascript">
import Rules from '../../assets/validate/rules';
import { Taskseq } from '../../services/admin';
import mixins from '../../components/mixins/base';

export default {
  data() {
    return {
      form: {
        name: '',
        procId: '',
        taskflowTypeModuleSaveDTOList: [],
      },
      modulesList: [],
      procsList: [],
      thead: ['流水类型名称', '流程', '新建时间', '操作'],
      tbody: [],
      paginationData: {},
      checkList: [],
      conditions: {
        pageSize: '',
        pageNo: '',
      },
      loading: true,
      dialogShow: false,
      submitMessage: '新增',
      rules: {
        name: [
          { ...Rules.required, message: '请填写订单类型名称' }, {
            max: 16, message: '订单类型名称长度不能超过16个字',
          },
        ],
        procId: [
          { ...Rules.required, type: 'number', message: '请选择任务流水处理器' },
        ],
        taskflowTypeModuleSaveDTOList: [
          {
            type: 'array',
            required: true,
            message: '请至少选择选择一个流程',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  created() {
    this.init(this.$route.params.id);
  },
  methods: {
    init: function (val) {
      this.loading = false;
      Taskseq.typeList({ cliqueId: val }).then(res => {
        this.paginationData = res.data;
        this.tbody = res.data.result;
        this.conditions.pageSize = res.data.pageSize;
        this.conditions.pageNo = res.data.page;
      }).catch(err => {
        console.log(err);
      });
    },
    add: function () {
      this.form = {
        name: '',
        procId: '',
        taskflowTypeModuleSaveDTOList: [],
      };
      this.dialogShow = true;
      Promise.all([
        Taskseq.moduleList(),
        Taskseq.procList()])
        .then(([moduleData, procData]) => {
          this.loading = false;
          this.modulesList = moduleData.data;
          this.procsList = procData.data;
        }).catch(err => {
          console.log(err);
        });
    },
    onSubmitOrder: function (formName) {
      const self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          for (let i = 0; i < this.form.taskflowTypeModuleSaveDTOList.length; i += 1) {
            this.form.taskflowTypeModuleSaveDTOList[i].beginStCode = '';
            this.form.taskflowTypeModuleSaveDTOList[i].moduleId
            = this.form.taskflowTypeModuleSaveDTOList[i].id;
          }
          this.$emit('toDetail', this.form);
        } else {
          return false;
        }
        return false;
      });
    },
    resetForm: function (formName) {
      const self = this;
      self.form = {
        name: '',
        procId: '',
        taskflowTypeModuleSaveDTOList: [],
      };
      self.dialogShow = false;
      self.$refs[formName].resetFields();
    },
    resetDialog: function () {
      this.resetForm('form');
    },
    handleSizeChange: function (val) {
      this.paginationData.pageSize = val;
      this.conditions.pageSize = val;
      this.paginationData.page = 0;
    },
    handleCurrentChange: function (val) {
      this.paginationData.page = val;
    },
    detail: function (val) {
      this.$emit('toDetail', val);
    },
    deleteStorage: function () {
      this.$confirm('此操作将清除缓存, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        Taskseq.storageDelete().then(res => {
          if (res.status === 204) {
            this.$message({
              message: '清除成功',
              type: 'success',
            });
            this.init(this.$route.params.id);
          }
        }).catch(err => {
          console.log(err);
        }).finally(() => {
          this.request = false;
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消清除',
        });
      });
    },
    deleteType: function (val) {
      this.$confirm('此操作将禁用该流水类型且无法重新启用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        Taskseq.typeDelete({ tskfTypeId: val }).then(res => {
          if (res.status === 204) {
            this.$message({
              message: '禁用成功',
              type: 'success',
            });
            this.init(this.$route.params.id);
          }
        }).catch(err => {
          console.log(err);
        }).finally(() => {
          this.request = false;
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消禁用',
        });
      });
    },
  },
  components: {
  },
  mixins: [mixins],
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
