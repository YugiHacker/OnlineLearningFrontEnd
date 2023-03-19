import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import { HomeIcon1, LearnIcon, BlogIcon, PlusIcon } from '~/components/Icons';
import config from '~/config/routes';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div>
            <aside className={cx('wrapper')}>
                <Menu>
                    <MenuItem title="" to={config.newPost} isPlus icon={<PlusIcon />} />
                    <MenuItem title="Home" to={config.home} icon={<HomeIcon1 />} />
                    <MenuItem title="Learn" to={config.allCourses} icon={<LearnIcon />} />
                    <MenuItem title="Blog" to={config.live} icon={<BlogIcon />} />
                </Menu>

                {/* <SuggestedAccounts label="Suggested accounts" />
            <SuggestedAccounts label="Following accounts" /> */}
            </aside>
        </div>
    );
}

export default Sidebar;
