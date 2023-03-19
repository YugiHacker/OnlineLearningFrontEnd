import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import * as request from '~/utils/request';
import MenuAssignment from './MenuAssignment'
import MenuLession from './MenuLession'
const SubMenu = Menu.SubMenu;

function MaterialBar(props) {
    const [dataSource, setDataSource] = useState([]);
    const handleClick = (e) => {
        console.log('click ', e);
    };
    useEffect(() => {
        const res = async () => {
            const loadData = await request.get('Chapter');
            setDataSource(loadData);
        };
        res();
    },[])
    const chapterList = dataSource.map((chapter) =>
        <SubMenu key={"c" + chapter.chapterId} title={<span>{chapter.title}</span>}>
            <MenuLession chapterId = {chapter.chapterId}></MenuLession>
            <MenuAssignment chapterId = {chapter.chapterId}></MenuAssignment>
        </SubMenu>
    )
    return (
        <div>
            <Menu onClick={handleClick} style={{ width: 240 }} mode="inline">
                {chapterList}
            </Menu>
        </div>
    );
}

export default MaterialBar;
