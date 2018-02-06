<template>
  <div class="container">
    <div class="dis-flex">
      <div class="page-oper">
        <div class="page-title">沟通登记</div>
      </div>
      <div class="container" v-loading.lock="loading">
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="140px">

          <el-row>
            <el-col :span="8">
              <el-form-item  label="客户号" prop="mobile">
                <el-input v-model="baseInfo.custId" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人姓名" prop="name">              
                <el-input v-model="baseInfo.ctctName" disabled></el-input>                          
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="联系人电话">
                <el-input v-model="baseInfo.ctctMobile" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="设计师">
                <el-input v-model="baseInfo.dsgnName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item label="修改意见" prop="content">
                <el-col :span="24">
                  <el-input type="textarea" :rows="2" placeholder="请填写修改意见" v-model="form.content"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="沟通时间" prop="time">
                <el-col :span="24">  
                  <el-date-picker
                    v-model="form.time"
                    type="datetime"
                    @change="format('time')"
                    placeholder="选择日期时间">
                  </el-date-picker>                                          
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="下次沟通时间" prop="nextTime">
                <el-col :span="24">              
                  <el-date-picker
                    v-model="form.nextTime"
                    type="datetime"
                    @change="format('nextTime')"
                    placeholder="选择日期时间">
                  </el-date-picker>  
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
      
          <el-row>
            <el-col :span="16">
              <el-form-item label="待成交关键点" prop="pointsArr">                       
                <el-checkbox-group v-model="form.pointsArr" @change="handleCheckedChange">
                  <el-checkbox v-for="item in keyPoints" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                </el-checkbox-group>                    
                </el-select>                        
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item label="备注" prop="remark">
                <el-col :span="24">
                  <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.remark"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" @click="onSubmit('ruleForm')" class="my-button" :loading="request">保 存</el-button>
            <el-button @click="returnList" class="my-button">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Taskseq, Touch } from '../../../services/admin';
import Rules from '../../../assets/validate/rules';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      form: {
        pointsArr: [],
      },
      loading: true,
      request: false,
      baseInfo: {},
      keyPoints: [],
      rules: {
        content: [
          { ...Rules.required, message: '请填写修改意见 ' },
          { ...Rules.range255 },
        ],
        time: [
          { ...Rules.date, message: '请选择沟通时间' },
        ],
        pointsArr: [
          {
            ...Rules.required,
            type: 'array',
            message: '请至少选择一个关键点',
          },
        ],
        remark: [
          { ...Rules.range255 },
        ],
      },
    };
  },
  created() {
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
    } else {
      this.loading = false;
    }
  },
  methods: {
    init: function (val) {
      Promise.all([
        Taskseq.detailBase(val), Touch.keypoints()])
        .then(([baseData, keypoints]) => {
          this.form.tskfId = this.$route.params.id;
          this.loading = false;
          this.baseInfo = baseData.data;
          this.form.custId = baseData.data.custId;
          this.keyPoints = keypoints.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCheckedChange() {
      if (typeof this.form.pointsArr === 'object') {
        this.form.unsetKeyPointIds = this.form.pointsArr.join(',');
      }
    },
    format: function (key) {
      this.form[`${key}`] = this.dateHmsFormat(this.form[`${key}`]);
    },
    onSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.request = true;
          Touch.touchSubmit(this.form).then(res => {
            if (res.status === 201) {
              this.$message({
                message: '操作成功',
                type: 'success',
              });
              this.$router.push(`/order/taskseq/detail/${this.$route.params.id}`);
            }
          }).catch(err => {
            this.handleError(err);
          }).finally(() => {
            this.request = false;
          });
        } else {
          console.log('error submit!!');
        }
      });
    },
    returnList: function () {
      this.$router.push(`/order/taskseq/detail/${this.$route.params.id}`);
    },
  },
  mixins: [mixins],
};
</script>
