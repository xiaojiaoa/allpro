<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div>
        <div class="page-oper">
          <div class="page-title">流水流程列表</div>
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
              <tr v-for="(item, index) in form.taskflowTypeModuleSaveDTOList">
                <td>
                  {{index + 1}}
                </td>
                <td>{{item.name}}</td> 
                <td> 
                  <span v-for="aaa in item.beginStCodeArr" :key="aaa.id" v-if="btnVisible">{{aaa.name}}&nbsp;&nbsp;&nbsp;</span>  
                  <span v-if="!btnVisible">{{item.beginModuleStCodeStr}}</span>                             
                </td>
                <td>
                  <span v-for="aaa in item.rollBackStCodeArr" :key="aaa.id" v-if="btnVisible">{{aaa.name}}&nbsp;&nbsp;&nbsp;</span>
                  <span v-if="!btnVisible">{{item.rollBackModuleStCodeStr}}</span>
                </td>
                <td>
                  <el-button type="primary" @click="setModule(item.id, item.name, index)" v-if="accessStcode">设置</el-button>
                  <span v-else>不可设置</span>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="form-footer" v-if="btnVisible">
              <el-button @click="cancle">取消</el-button>
              <el-button type="primary" @click="onSubmitForm">确定新建</el-button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
    <el-dialog title="新建流水类型" :visible.sync="dialogShow" custom-class="addOrder" :before-close="resetDialog">
      <el-form :model="moduleForm" ref="moduleForm" :rules="rules" label-width="140px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="流水类型名称">
              <el-input v-model="form.name" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="任务流水处理器">
              <el-select v-model="form.procId" placeholder="请选择" disabled>
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
            <el-form-item label="所选流程" class="required">
              <el-input v-model="moduleForm.name" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="限制流程" prop="beginStCodeArr">
              <el-checkbox-group v-model="moduleForm.beginStCodeArr" @change="formatArr('beginStCodeArr', 'beginStCode')">
                <el-checkbox v-for="item in typeData.taskflowTypeModuleSaveDTOList" :label="item" :key="item.id" v-if="item.stCode && item.stCode !== 500">
                  {{item.name}}     
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="回退流程" prop="rollBackStCodeArr">
              <el-checkbox-group v-model="moduleForm.rollBackStCodeArr" @change="formatArr('rollBackStCodeArr', 'rollBackStCode')">
                <el-checkbox v-for="item in typeData.taskflowTypeModuleSaveDTOList" :label="item" :key="item.id" v-if="item.stCode && item.stCode !== 500">
                  {{item.name}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetDialog">取消</el-button>
        <el-button type="primary" @click="onSubmit('moduleForm')">确定</el-button>
      </div>
    </el-dialog>
  </div> 
</template>
<script type="text/javascript">
// import Rules from '../../assets/validate/rules';
import { Taskseq } from '../../services/admin';

export default {
  data() {
    return {
      form: {
        cliqueId: '',
        name: '',
        procId: '',
        taskflowTypeModuleSaveDTOList: [],
      },
      accessStcode: false,
      btnVisible: false,
      moduleForm: {
        index: '',
        moduleId: '',
        beginStCodeArr: [],
        rollBackStCodeArr: [],
      },
      flowCodeList: [],
      superTypeList: [],
      thead: ['已选流程', '限制流程', '撤回流程', '操作'],
      tbody: [],
      loading: true,
      dialogShow: false,
      flag: false,
      procsList: [],
      modulesList: [],
      rules: {
        beginStCodeArr: [
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
    this.init();
    console.log('typeData', this.typeData);
    console.log('typePage', this.typePage);
  },
  props: [
    'typeData',
    'typePage',
  ],
  methods: {
    init: function () {
      this.loading = false;
      if (this.typePage === 'addList') {
        this.btnVisible = true;
        this.typeData.taskflowTypeModuleSaveDTOList.forEach(v => {
          if (v.stCode && v.stCode !== 500) {
            this.accessStcode = true;
          }
        });
        this.form = JSON.parse(JSON.stringify(this.typeData));
        this.form.cliqueId = this.$route.params.id;
        console.log(this.form.procId);
        Taskseq.procList().then(res => {
          this.procsList = res.data;
        }).catch(err => {
          console.log(err);
        });
      } else {
        Taskseq.typeDetail(this.typeData).then(res => {
          this.form.taskflowTypeModuleSaveDTOList = res.data.taskflowModuleTypeListVOList;
        }).catch(err => {
          console.log(err);
        });
      }
    },
    setModule: function (id, val, index) {
      this.moduleForm.index = index;
      this.moduleForm.name = val;
      this.moduleForm.moduleId = id;
      if (this.form.taskflowTypeModuleSaveDTOList[index].beginStCodeArr) {
        this.moduleForm = this.form.taskflowTypeModuleSaveDTOList[index];
      }
      this.dialogShow = true;
    },
    formatArr: function (Arr, key) {
      if (typeof this.moduleForm[`${Arr}`] === 'object' && this.moduleForm[`${Arr}`].length > 0) {
        const arr = [];
        for (let i = 0; i < this.moduleForm[`${Arr}`].length; i += 1) {
          arr.push(this.moduleForm[`${Arr}`][i].stCode);
        }
        this.moduleForm[`${key}`] = arr.join(',');
      }
    },
    onSubmit: function (formName) {
      const self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.form.taskflowTypeModuleSaveDTOList[self.moduleForm.index] = self.moduleForm;
          self.dialogShow = false;
          self.resetDialog();
        } else {
          return false;
        }
        return false;
      });
    },
    onSubmitForm: function () {
      const self = this;
      self.form.taskflowTypeModuleSaveDTOList.forEach((state, index) => {
        if (state.beginStCode === '') {
          const defaultArr = [];
          this.typeData.taskflowTypeModuleSaveDTOList.forEach(v => {
            if (v.stCode && v.stCode !== 500) {
              defaultArr.push(v.stCode);
            }
          });
          state.beginStCode = defaultArr.join(',');
        }
        if (index === self.form.taskflowTypeModuleSaveDTOList.length - 1) {
          this.submitForm(self.form);
        }
      });
    },
    resetDialog: function () {
      const self = this;
      self.moduleForm = {
        moduleId: '',
        beginStCodeArr: [],
        rollBackStCodeArr: [],
      };
      self.dialogShow = false;
    },
    cancle: function () {
      this.$confirm('此操作将清空该列表并返回类型列表, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.returnList();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消',
        });
      });
    },
    returnList: function () {
      this.$emit('toList', {});
    },
    submitForm: function (val) {
      Taskseq.typeSave(val).then(res => {
        if (res.status === 201) {
          this.$message({
            message: '新增成功',
            type: 'success',
          });
          this.returnList();
        }
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        this.request = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.form-footer{
  text-align: center;
  margin-top: 20px;
}
</style>
