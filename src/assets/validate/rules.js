const Rules = {
  required: {
    required: true, message: '请填写必选内容', trigger: 'blur',
  },

  select: {
    required: true, message: '请选择一个必须项', trigger: 'change',
  },

  date: {
    required: true, message: '请选择日期', trigger: 'change',
  },

  checkbox: {
    type: 'array', required: true, message: '请至少选择一个项', trigger: 'change',
  },

  email: {
    type: 'email', required: true, message: '请输入正常的邮箱', trigger: 'blur',
  },

  number: {
    type: 'number', message: '请输入正常的数字', trigger: 'blur',
  },

  mobile: {
    pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号',
  },

  number2: {
    pattern: /^[0-9]+(.[0-9]{0,2})?$/, message: '小数点最多两位，且为正数',
  },

};

export default Rules;
