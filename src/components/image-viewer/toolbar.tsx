import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

import {
    LeftOutlined,
    RightOutlined,
    ZoomInOutlined,
    CloseOutlined,
    ZoomOutOutlined,
    OneToOneOutlined,
    ExpandOutlined,
    RotateLeftOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import ImageViewerToolbarButton from './toolbar/button';
import ImageViewerToolbarDivider from './toolbar/divider';

const useStyles = createUseStyles({
    toolbar: {
        background: 'rgba(0, 0, 0, 0.75)',
        padding: [0, 12],
        cursor: 'default',
        border: 'none',
        borderRadius: 4,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        boxShadow: [0, 6, 24, 0, 'rgba(31,35,41,.1)'],

        height: 48,
        width: 'auto',

        color: 'white',
    },
    pageNum: {
        minWidth: 46,
        textAlign: 'center',
    },
    ratio: {
        width: 48,
        textAlign: 'center',
    },
});

export type ToolbarEvent = 'prev' | 'next' | 'zoomin' | 'zoomout' | 'original' | 'fitscreen' | 'rotate';

interface ImageViewerToolbarProps
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
    onEvent(event: ToolbarEvent): void;
    current: number;
    total: number;
    zoomLevel: number;
}

export default function ImageViewerToolbar(props: ImageViewerToolbarProps) {
    const classes = useStyles();
    const { onEvent, current, total, zoomLevel, className, ...containerProps } = props;
    const [toggle, setToggle] = useState(false);

    return (
        <ul className={classNames(classes.toolbar, className)} {...containerProps}>
            <ImageViewerToolbarButton
                disabled={current === 1}
                onClick={() => onEvent('prev')}
                tooltip="上一张"
                icon={<LeftOutlined />}
            />
            <span className={classes.pageNum}>
                {current}/{total}
            </span>
            <ImageViewerToolbarButton
                disabled={current === total}
                onClick={() => onEvent('next')}
                tooltip="下一张"
                icon={<RightOutlined />}
            />
            <ImageViewerToolbarDivider />
            <ImageViewerToolbarButton onClick={() => onEvent('zoomin')} tooltip="放大" icon={<ZoomInOutlined />} />
            <span className={classes.ratio}>{Math.floor(zoomLevel * 100)}%</span>
            <ImageViewerToolbarButton onClick={() => onEvent('zoomout')} tooltip="缩小" icon={<ZoomOutOutlined />} />
            {!toggle ? (
                <ImageViewerToolbarButton
                    onClick={() => {
                        onEvent('original');
                        setToggle((toggle) => !toggle);
                    }}
                    tooltip="原始尺寸"
                    icon={<OneToOneOutlined />}
                />
            ) : (
                <ImageViewerToolbarButton
                    onClick={() => {
                        onEvent('fitscreen');
                        setToggle((toggle) => !toggle);
                    }}
                    tooltip="适应屏幕"
                    icon={<ExpandOutlined />}
                />
            )}
            <ImageViewerToolbarDivider />
            <ImageViewerToolbarButton onClick={() => onEvent('rotate')} tooltip="旋转" icon={<RotateLeftOutlined />} />
        </ul>
    );
}
