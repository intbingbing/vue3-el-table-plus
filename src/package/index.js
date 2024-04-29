import TablePlus from "./TablePlus/TablePlus.vue"; // 引入封装好的组件

const components = [TablePlus];
const install = function (App, options) {
    components.forEach((component) => {
        App.component(component.name, component);
    });
};
export default { install }; 