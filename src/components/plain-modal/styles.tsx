import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    dialogWrap: {
        width: 'inherit !important',
        '&.contentFullScreen': {
            width: '100% !important',
            height: '100%',
            '& .rc-dialog-content': {
                width: '100% !important',
                height: '100%',
            },
            '& .rc-dialog-body': {
                width: '100% !important',
                height: '100%',
                position: 'relative',
            },
        },
        '& .rc-dialog-content': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent !important',
        },
        '& .rc-dialog-body': {
            padding: '0 !important',
        },
    },
    dialogRoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewerContainer: `
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        font-size: 0;
        line-height: 0;
        direction: ltr;
        user-select: none;
        touch-action: none;
        -webkit-tap-highlight-color: transparent;
    `,
});

export default useStyles;
