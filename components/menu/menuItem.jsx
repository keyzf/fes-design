import {
    defineComponent,
    computed,
    onMounted,
    onBeforeUnmount,
    getCurrentInstance,
} from 'vue';
import Ellipsis from '../ellipsis';
import getPrefixCls from '../_util/getPrefixCls';
import { COMPONENT_NAME } from './const';
import useMenu from './useMenu';

const prefixCls = getPrefixCls('menu-item');
export default defineComponent({
    name: COMPONENT_NAME.MENU_ITEM,
    components: {
        Ellipsis,
    },
    props: {
        value: {
            type: String,
            required: true,
        },
        label: String,
    },
    setup(props, { slots }) {
        const instance = getCurrentInstance();
        const {
            rootMenu, parentMenu, paddingStyle, onlyIcon,
        } = useMenu(instance);
        // 根节点 menu
        if (!rootMenu) {
            return console.warn(
                `[${COMPONENT_NAME.MENU_ITEM}] must be a child of ${COMPONENT_NAME.MENU}`,
            );
        }
        // 父级组件，可能为 menu 或者 sub-menu
        if (!parentMenu) {
            return console.warn(
                `[${COMPONENT_NAME.SUB_MENU}] must be a child of ${COMPONENT_NAME.MENU} or ${COMPONENT_NAME.SUB_MENU}`,
            );
        }
        const isActive = computed(
            () => rootMenu.currentValue.value === props.value,
        );
        const menuItem = {
            uid: instance.uid,
            type: 'menu',
            value: props.value,
            isActive,
        };
        onMounted(() => {
            parentMenu.addChild(menuItem);
        });
        onBeforeUnmount(() => {
            parentMenu.removeChild(menuItem);
        });
        const classList = computed(() => [prefixCls, isActive.value && 'is-active'].filter(Boolean).join(' '));
        const handleClick = () => {
            rootMenu.clickMenuItem(props.value);
        };
        const renderTitle = () => {
            const Wrapper = <Ellipsis triggerClass={`${prefixCls}-label`}></Ellipsis>;
            return <Wrapper>{slots.label?.() || props.label}</Wrapper>;
        };
        const renderIcon = () => {
            if (slots.icon) {
                return (
                    <span className={`${prefixCls}-icon`}>{slots.icon()}</span>
                );
            }
            if (onlyIcon.value) {
                return renderTitle();
            }
            return null;
        };
        return () => (
            <div className={classList.value} onClick={handleClick}>
                <div className={`${prefixCls}-wrapper`} style={paddingStyle.value}>
                    {renderIcon()}
                    {!onlyIcon.value ? renderTitle() : null}
                </div>
            </div>
        );
    },
});
