const Rules = {
  required: {
    required: true, message: '请填写必选内容', trigger: 'blur',
  },

  select: {
    required: true, message: '请选择一个必须项', trigger: 'change',
  },

  date: {
    type: 'date', required: true, message: '请选择日期', trigger: 'change',
  },

  checkbox: {
    type: 'array', required: true, message: '请至少选择一个项', trigger: 'change',
  },

  email: {
    type: 'email', required: true, message: '请输入正常的邮箱', trigger: 'blur',
  },
};

export default Rules;
