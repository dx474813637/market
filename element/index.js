// 导入自己需要的组件
import './element-variables.scss'

import Icon from 'element-ui/lib/icon';
import select from 'element-ui/lib/select';
import option from 'element-ui/lib/option';
import optionGroup from 'element-ui/lib/option-group';
import button from 'element-ui/lib/button';
import radio from 'element-ui/lib/radio';
import radioGroup from 'element-ui/lib/radio-group';
import checkbox from 'element-ui/lib/checkbox';
import checkboxGroup from 'element-ui/lib/checkbox-group';
import dialog from 'element-ui/lib/dialog';
import datePicker from 'element-ui/lib/date-picker';
import cascader from 'element-ui/lib/cascader';
import form from 'element-ui/lib/form';
import formItem from 'element-ui/lib/form-item';
import input from 'element-ui/lib/input';
import table from 'element-ui/lib/table';
import tableColumn from 'element-ui/lib/table-column';
import pagination from 'element-ui/lib/pagination';
import row from 'element-ui/lib/row';
import col from 'element-ui/lib/col';
import ElSwitch from 'element-ui/lib/switch';

const element = {
  install: function (Vue) {
    Vue.use(row)
    Vue.use(col)
    Vue.use(select)
    Vue.use(option)
    Vue.use(optionGroup)
    Vue.use(Icon)
    Vue.use(button)
    Vue.use(radio)
    Vue.use(checkbox)
    Vue.use(radioGroup)
    Vue.use(checkboxGroup)
    Vue.use(dialog)
    Vue.use(cascader)
    Vue.use(form)
    Vue.use(formItem)
    Vue.use(datePicker)
    Vue.use(input)
    Vue.use(table)
    Vue.use(tableColumn)
    Vue.use(pagination)
    Vue.use(ElSwitch)
  }
}
export default element
