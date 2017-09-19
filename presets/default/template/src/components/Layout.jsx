import React from 'react'
import PropTypes from 'prop-types'
import style from './Layout.less'

const Layout = props => (
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
)

Layout.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Layout
