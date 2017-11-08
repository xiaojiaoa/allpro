<template>
  <div class="container">
    <div class="dis-flex">
      <div class="page-oper">
        <div class="page-title">新增门店信息</div>
      </div>
      <div class="container">
        <el-form ref="form" :model="form" label-width="140px">

          <el-row>
            <el-col :span="16">
              <el-form-item label="门店名称" class="required">
                <el-col>
                    <el-input v-model="form.name"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="负责人姓名">
                <el-input v-model="form.employeeName "></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="负责人手机">
                <el-input v-model="form.mobile "></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="门店类型" class="required">
                <el-select v-model="form.idcardType " placeholder="请选择门店类型">
                  <el-option label="建材" value="14"></el-option>
                  <el-option label="仓储" value="13"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="经营类型" class="required">
                <el-select v-model="form.idcardType " placeholder="请选择经营类型">
                  <el-option label="展示设计部" value="15"></el-option>
                  <el-option label="新增样品部" value="14"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="其他类型">
                <el-select v-model="form.did" placeholder="请选择">
                  <el-option label="工程部" value="2"></el-option>
                  <el-option label="工艺技术" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="是否自带仓库" class="required">
                <el-select v-model="form.idcardType " placeholder="请选择">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="最低资金" class="required">
                <el-col>
                <el-input></el-input>
                </el-col>
                <el-col :span="1">
                  元
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="预警资金">
                <el-input v-model="form.employeeName "></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="负责人手机">
                <el-input v-model="form.mobile "></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item  label="预约电话">
                <el-input v-model="form.employeeName "></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="营业时间">
                <el-input v-model="form.mobile "></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="16">
              <el-form-item  label="出生所在地">
                <el-col :span="12">
                  <el-col :span="10">
                    <el-select  v-model="form.birthCountry" placeholder="">
                      <el-option label="中国" value="10000" ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="1" class="blank"></el-col>
                  <el-col :span="1" class="blank"></el-col>
                  <el-col :span="10">
                    <el-select v-model="form.birthProvince" placeholder="省">
                      <el-option label="湖北省" value="10000"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="1" class="blank"></el-col>
                </el-col>
                <el-col :span="12">
                  <el-col :span="11">
                    <el-select v-model="form.birthCity" placeholder="市">
                      <el-option label="武汉市" value="10000"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="1" class="blank"></el-col>
                  <el-col :span="1" class="blank"></el-col>
                  <el-col :span="11">
                    <el-select v-model="form.birthDist" placeholder="区" >
                      <el-option label="洪山区" value="10000"></el-option>
                    </el-select>
                  </el-col>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item label="门店地址">
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6" :offset="8">
              <el-form-item>
                <el-button type="primary" @click="onSubmit" class="my-button">确认添加</el-button>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { Employees } from '../../../services/admin';

  export default {
    data() {
      return {
        form: {
          gender: '1',
          empType: '10',
          isMarrige: '1',
          idcardType: '1',
          idcard: '411102199203050013',
          birthday: '2017-11-09',
          telephone: '854583636',
          education: '1',
          birthCountry: '10000',
          birthProvince: '10000',
          birthCity: '10000',
          birthDist: '10000',
          resideCountry: '10000',
          resideProvince: '10000',
          resideCity: '10000',
          resideDist: '10000',
          idPhotoOne: '',
          idPhotoTwo: '',
          did: '',
          mobile: '13732294417',
          name: '洪炳林',
        },
      };
    },
    created() {
    },
    methods: {
      handlePhotoOneSuccess(res) {
        this.form.idPhotoOne = res.data.url;
      },
      handlePhotoTwoSuccess(res) {
        this.form.idPhotoTwo = res.data.url;
      },
      beforeUpload(file) {
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
          this.$message.error('上传照片大小不能超过 5MB!');
        }
        return isLt5M;
      },
      onSubmit: function () {
        console.log(this.form);
        Employees.edit(this.form)
          .then(res => {
            console.log('res', res);
            this.$message({
              message: '新增成功',
              type: 'success',
            });
            this.$router.push('/basic/employees/list');
          })
          .catch(err => {
            console.log(err);
          });
      },
      returnList: function () {
        this.$router.push('/basic/employees/list');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .idCard{
    width: 170px;
  }
</style>
