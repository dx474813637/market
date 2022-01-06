// 导入自己需要的组件
import './element-variables.scss'

import Icon from 'element-ui/lib/icon';
import select from 'element-ui/lib/select';
import option from 'element-ui/lib/option';
import optionGroup from 'element-ui/lib/option-group';
import button from 'element-ui/lib/button';
import radio from 'element-ui/lib/radio';
import radioGroup from 'element-ui/lib/radio-group';
import radioButton from 'element-ui/lib/radio-button';
import checkbox from 'element-ui/lib/checkbox';
import checkboxGroup from 'element-ui/lib/checkbox-group';
import dialog from 'element-ui/lib/dialog';
import datePicker from 'element-ui/lib/date-picker';
import cascader from 'element-ui/lib/cascader';
import form from 'element-ui/lib/form';
import formItem from 'element-ui/lib/form-item';
import input from 'element-ui/lib/input';
import inputNumber from 'element-ui/lib/input-number';
import table from 'element-ui/lib/table';
import tableColumn from 'element-ui/lib/table-column';
import pagination from 'element-ui/lib/pagination';
import row from 'element-ui/lib/row';
import col from 'element-ui/lib/col';
import ElSwitch from 'element-ui/lib/switch';
import menu from 'element-ui/lib/menu';
import subMenu from 'element-ui/lib/submenu';
import menuItem from 'element-ui/lib/menu-item';
import menuItemGroup from 'element-ui/lib/menu-item-group';
import step from 'element-ui/lib/step';
import steps from 'element-ui/lib/steps';
import result from 'element-ui/lib/result';
import image from 'element-ui/lib/image';
import card from 'element-ui/lib/card';
import popconfirm from 'element-ui/lib/popconfirm';
import popover from 'element-ui/lib/popover';
import notification from 'element-ui/lib/notification';
import link from 'element-ui/lib/link';
import tabs from 'element-ui/lib/tabs';
import tabPane from 'element-ui/lib/tab-pane';
import message from 'element-ui/lib/message';
import message_box from 'element-ui/lib/message-box';
import loading from 'element-ui/lib/loading';


const element = {
	install: function(Vue) {
		Vue.prototype.$notify = notification;
		Vue.prototype.$msgbox = message_box;
		Vue.prototype.$alert = message_box.alert;
		Vue.prototype.$confirm = message_box.confirm;
		Vue.prototype.$prompt = message_box.prompt;
		Vue.prototype.$message = message;
		Vue.use(loading)
		Vue.use(inputNumber)
		Vue.use(tabs)
		Vue.use(tabPane)
		Vue.use(link)
		Vue.use(popover)
		Vue.use(popconfirm)
		Vue.use(card)
		Vue.use(image)
		Vue.use(result)
		Vue.use(step)
		Vue.use(steps)
		Vue.use(subMenu)
		Vue.use(menu)
		Vue.use(menuItem)
		Vue.use(menuItemGroup)
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
		Vue.use(radioButton)
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
