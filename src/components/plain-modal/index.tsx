import React from 'react';

import Dialog from 'rc-dialog';
import 'rc-dialog/assets/index.css';

import classNames from 'classnames';
import useStyles from './styles';

export interface DialogProps extends React.ComponentProps<typeof Dialog> {
    contentFullScreen?: boolean;
}

export default function PlainModal(props: DialogProps) {
    const { children, className, wrapClassName, contentFullScreen, ...otherProps } = props;
    const classes = useStyles();
    return (
        <Dialog
            animation="zoom"
            maskAnimation="fade"
            closable={false}
            {...otherProps}
            className={classNames(classes.dialogWrap, className, contentFullScreen && 'contentFullScreen')}
            wrapClassName={classNames(classes.dialogRoot, wrapClassName)}
        >
            {children}
        </Dialog>
    );
}
