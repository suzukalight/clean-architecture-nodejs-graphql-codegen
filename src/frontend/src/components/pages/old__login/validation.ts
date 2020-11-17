import * as yup from 'yup';

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('正しいメールアドレスを入力してください')
    .required('メールアドレスを入力してください'),
  password: yup.string().trim().required('パスワードを入力してください'),
});
