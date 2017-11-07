<template>
  <div class="container">
		<div class="dis-flex">
			<div class="page-oper">
				<div class="page-title">新增员工信息</div>
			</div>
			<div class="container">
				<el-form ref="form" :model="form" label-width="140px">

					<el-row>
						<el-col :span="8">
							<el-form-item  label="员工手机" class="required">
								<el-input v-model="form.mobile"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="员工姓名" class="required">
								<el-col :span="12">
									<el-col :span="23">
										<el-input v-model="form.name"></el-input>
									</el-col>
									<el-col :span="1" class="blank"></el-col>
								</el-col>
								<el-col :span="12">
									<el-col :span="1" class="blank"></el-col>
									<el-col :span="23">
										<el-select v-model="form.gender" placeholder="请选择性别">
											<el-option label="保密" value="0"></el-option>
											<el-option label="先生" value="1"></el-option>
											<el-option label="女士" value="2"></el-option>
										</el-select>
									</el-col>
								</el-col>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8">
							<el-form-item  label="员工固定电话">
								<el-input v-model="form.telephone "></el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8">
							<el-form-item  label="证件类型" class="required">
								<el-select v-model="form.idcardType " placeholder="请选择证件类型">
									<el-option label="身份证" value="1"></el-option>
									<el-option label="护照" value="2"></el-option>
									<el-option label="军官证" value="3"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="证件号码" class="required">
								<el-input v-model="form.idcard"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-col :span="1" class="blank"></el-col>
							<el-col :span="11">
								<el-upload
									class="avatar-uploader"
									action="http://192.2.17.74:8088/api/statics//file/card"
									:show-file-list="false"
									:on-success="handlePhotoOneSuccess"
									:before-upload="beforeUpload">
									<img v-if="form.idPhotoOne" :src="'http://192.2.17.74:8088/'+form.idPhotoOne" class="idCard">
									<el-button size="small" type="primary" class="my-button">证件照片正面</el-button>
								</el-upload>
								
							</el-col>
							<el-col :span="11">
									<el-upload
									class="avatar-uploader"
									action="http://192.2.17.74:8088/api/statics//file/card"
									:show-file-list="false"
									:on-success="handlePhotoTwoSuccess"
									:before-upload="beforeUpload">
									<img v-if="form.idPhotoTwo" :src="'http://192.2.17.74:8088/'+form.idPhotoTwo" class="idCard">
									<el-button size="small" type="primary" class="my-button">证件照片背面</el-button>
								</el-upload>
							</el-col>
							
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="16">
							<el-form-item  label="所属部门">
								<el-select v-model="form.did" placeholder="请选择所属部门">
									<el-option label="技术部" value="1"></el-option>
									<el-option label="行政部" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>


					<el-row>
						<el-col :span="8">
							<el-form-item label="角色">
								<el-checkbox-group>
									<el-checkbox label="安装负责人" name="type"></el-checkbox>
									<el-checkbox label="安装师傅" name="type"></el-checkbox>
									<el-checkbox label="财务" name="type"></el-checkbox>
									<el-checkbox label="店长" name="type"></el-checkbox>
								</el-checkbox-group>
							</el-form-item>
						</el-col>
					</el-row>


					<el-row>
						<el-col :span="8">
							<el-form-item  label="员工类型" class="required">
								<el-select v-model="form.empType" placeholder="请选择员工类型">
									<el-option label="企业" value="10"></el-option>
									<el-option label="加盟店" value="20"></el-option>
								</el-select>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item  label="生日">
								<el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8">
							<el-form-item  label="学历">
								<el-select v-model="form.education" placeholder="请选择员工学历">
									<el-option label="本科" value=""></el-option>
									<el-option label="大专" value=""></el-option>
								</el-select>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item  label="婚否">
								<el-select v-model="form.isMarrige" placeholder="请选择是否已婚">
									<el-option label="未婚" value="1"></el-option>
									<el-option label="已婚" value="2"></el-option>
								</el-select>
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
							<el-form-item  label="居住所在地">
								<el-col :span="12">
									<el-col :span="10">
										<el-select  v-model="form.resideCountry" placeholder="">
											<el-option label="中国" value="10000" ></el-option>
										</el-select>
									</el-col>
									<el-col :span="1" class="blank"></el-col>
									<el-col :span="1" class="blank"></el-col>
									<el-col :span="10">
										<el-select v-model="form.resideProvince" placeholder="省">
											<el-option label="湖北省" value="10000"></el-option>
										</el-select>
									</el-col>
									<el-col :span="1" class="blank"></el-col>
								</el-col>				
								<el-col :span="12">
									<el-col :span="11">
										<el-select v-model="form.resideCity" placeholder="市">
											<el-option label="武汉市" value="10000"></el-option>
										</el-select>
									</el-col>
									<el-col :span="1" class="blank"></el-col>
									<el-col :span="1" class="blank"></el-col>
									<el-col :span="11">
										<el-select v-model="form.resideDist" placeholder="区" >
											<el-option label="洪山区" value="10000"></el-option>
										</el-select>
									</el-col>
								</el-col>
							</el-form-item>
						</el-col>
					</el-row>

					<el-form-item>
						<el-button type="primary" @click="onSubmit" class="my-button">立即创建</el-button>
						<el-button @click="returnList" class="my-button">取 消</el-button>
					</el-form-item>
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
          this.$router.push('/member/employees/list');
        })
        .catch(err => {
          console.log(err);
        });
    },
    returnList: function () {
      this.$router.push('/member/employees/list');
    },
  },
};
</script>

<style lang="scss" scoped>
.idCard{
	width: 170px;
}
  // @import '../scss/views/index.scss';
</style>
