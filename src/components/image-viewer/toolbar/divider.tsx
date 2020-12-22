import React from 'react';
import { createUseStyles } from 'react-jss';
import viewerMixinStyle from '../cssMixin';

const useStyles = createUseStyles({
    divider: {
        ...viewerMixinStyle.size24,
        ...viewerMixinStyle.flex,

        pointerEvents: 'none',

        '&::before': {
            content: '""',
            borderLeft: '1px solid #646a73',
            fontWeight: 100,
            height: 18,
            left: '50%',
            width: 1,
        },
    },
});

export default function ImageViewerToolbarDivider() {
    const classes = useStyles();

    return <div className={classes.divider} />;
}
