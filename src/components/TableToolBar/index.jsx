import {Space, Button, Tooltip, Dropdown} from "antd";
import {
    PlusOutlined,
    ReloadOutlined,
    SettingOutlined,
    ColumnHeightOutlined
} from '@ant-design/icons';
import './index.scss'
import {useEffect, useState} from "react";
import {createDropdownItems} from "@utils/utils.js";

const TableToolBar = ({title = '编辑表格', space = 15, reloadFunc, setTableSize, tableBorder, setTableBorder}) => {
    const [settingSpin, setSettingSpin] = useState(false);
    const [reloadSpin, setReloadSpin] = useState(false);
    const [styles, setStyles] = useState({
        reload: {color: ''},
        column: {color: ''},
        setting: {color: ''},
    });

    const [action, setAction] = useState('');

    // 监听鼠标hover变更图标般色
    useEffect(() => {
        if (action.length) {

            let index = 0;
            if (action.indexOf('Enter') !== -1) {
                index = action.indexOf('Enter');
            } else if (action.indexOf('Leave') !== -1) {
                index = action.indexOf('Leave');
            }

            const attribute = action.slice(0, index);

            const cloneObj = JSON.parse(JSON.stringify(styles));
            const color = styles[attribute].color;
            cloneObj[attribute].color = color.length ? '' : '#167fff';
            setStyles(cloneObj);
        }

    }, [action])

    // 旋转图标
    const onMouse = (action) => {
        setAction(action);

        if (action === 'reloadEnter' || action === 'reloadLeave') {
            setReloadSpin(!reloadSpin)
        }

        if (action === 'settingEnter' || action === 'settingLeave') {
            setSettingSpin(!settingSpin);
        }
    }

    // dropdown items
    const tableDensityItems = createDropdownItems([
        (<span onClick={() => setTableSize('large')}>默认</span>),
        (<span onClick={() => setTableSize('middle')}>中等</span>),
        (<span onClick={() => setTableSize('small')}>紧密</span>),
    ]);

    const tableSettingItems = createDropdownItems([
        (<span onClick={() => setTableBorder(!tableBorder)}>显示边框</span>)
    ])

    return (
        <div className='ant-table-toolbar'>
            <div className='ant-table-toolbar-container'>
                <div className='ant-table-toolbar-left'>
                    <div className='ant-table-toolbar-left-item'>{title}</div>
                </div>
                <div className='ant-table-toolbar-right'>
                    <Space size={space}>
                        <Button type='primary' size='default' icon={<PlusOutlined/>}>新建</Button>
                        <Space size={space}>
                            <Tooltip placement="top" title='刷新列表'>
                                <div className='space-item'>
                                    <ReloadOutlined spin={reloadSpin} onClick={reloadFunc} style={styles.reload}
                                                    onMouseEnter={() => onMouse('reloadEnter')}
                                                    onMouseLeave={() => onMouse('reloadLeave')}
                                    />
                                </div>
                            </Tooltip>
                            <Tooltip placement="top" title='表格密度'>
                                <div className='space-item'>
                                    <Dropdown menu={{items: tableDensityItems}} placement="bottom">
                                        <ColumnHeightOutlined
                                            style={styles.column}
                                            onMouseEnter={() => onMouse('columnEnter')}
                                            onMouseLeave={() => onMouse('columnLeave')}/>
                                    </Dropdown>
                                </div>
                            </Tooltip>
                            <Tooltip placement="top" title='列设置'>
                                <div className='space-item'>
                                    <Dropdown menu={{items: tableSettingItems}} placement="bottom">

                                        <SettingOutlined spin={settingSpin} style={styles.setting}
                                                         onMouseEnter={() => onMouse('settingEnter')}
                                                         onMouseLeave={() => onMouse('settingLeave')}/>
                                    </Dropdown>
                                </div>
                            </Tooltip>
                        </Space>
                    </Space>
                </div>
            </div>

        </div>
    );
}

export default TableToolBar;