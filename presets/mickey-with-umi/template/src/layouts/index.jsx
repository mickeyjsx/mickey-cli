import React from 'react';
import PropTypes from 'prop-types';
import { LocaleProvider } from 'antd';
import antdCN from 'antd/lib/locale-provider/zh_CN';
import style from './index.less';

const Layout = props => (
  <LocaleProvider locale={antdCN}>
    <div className={style.layout}>
      {props.children}
      <div className={style.footer}>
        This a demo App base on <a
          href="https://github.com/mickeyjsx/mickey"
          rel="noopener noreferrer"
          target="_blank"
        >mickey</a>
      </div>
    </div>
  </LocaleProvider>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
