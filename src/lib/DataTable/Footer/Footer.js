import React from 'react'
import classNames from '../../Utils/classNames';

const Footer = ({ children, sticky, ...props }) => {

    const className = classNames(
        `vui-DataTable-Row vui-DataTable-Footer`,
        sticky && 'sticky'
    )

    return (
        <tfoot className={className} {...props}>
            {children}
        </tfoot>
    );
}

export default Footer;
