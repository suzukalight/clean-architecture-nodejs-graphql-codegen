import * as yup from 'yup';

export const createTodoValidationSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required('タイトルを入力してください')
    .max(250, '250文字以下で入力してください'),
});
