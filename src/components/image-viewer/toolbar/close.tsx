import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import viewerMixinStyle from '../cssMixin';

const useStyles = createUseStyles({
    wrapper: {
        ...viewerMixinStyle.hover,
        ...viewerMixinStyle.flex,

        cursor: 'pointer',

        fontSize: 18,

        width: 48,
        height: 48,
        borderRadius: '100%',

        backgroundColor: 'rgba(0,0,0,.75)',
        color: 'white',
    },
});

type ImageViewerToolbarButtonProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function ImageViewerToolbarClose(props: ImageViewerToolbarButtonProps) {
    const { className, ...divProps } = props;
    const classes = useStyles();
    return (
        <div className={classNames(classes.wrapper, className)} {...divProps}>
            <CloseOutlined />
        </div>
    );
}
