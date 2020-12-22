import React, { useState, useCallback, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { LoadingOutlined, FrownOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import PlainModal, { DialogProps } from '../plain-modal';
import ImageViewerToolbar, { ToolbarEvent } from './toolbar';
import ImageViewerToolbarClose from './toolbar/close';
import ClickStopper from '../plain-modal/click';
import viewerMixinStyle from './cssMixin';
import useImageViewerSetup from './hooks';

const useStyles = createUseStyles({
    hidden: {
        visibility: 'hidden',
    },
    control: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        userSelect: 'none',

        opacity: 0,
        pointerEvents: 'none',
        transition: 'opacity 0.5s ease',

        '&.active': {
            opacity: 1,
            pointerEvents: 'initial',
        },
    },
    toolbar: {
        margin: [20, 'auto'],

        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',

        pointerEvents: 'initial',
    },
    closeIcon: {
        position: 'absolute',
        top: 16,
        right: 16,
        pointerEvents: 'initial',
    },
    loading: {
        ...viewerMixinStyle.flex,
        fontSize: 40,
        color: '#3370FF',
    },
    transition: {
        transition: 'all .15s ease-out',
    },
    errorWrapper: {
        fontSize: 48,
        color: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

interface ImageViewerProps extends DialogProps {
    images: string[];
    initialIndex: number;
}

export default function ImageViewer(props: ImageViewerProps) {
    const { images, initialIndex, ...dialogProps } = props;
    const classes = useStyles();

    const [loading, setLoading] = useState<boolean | null>(true);
    const [controlActive, setControlActive] = useState(false);
    const enforceActive = useRef(false);
    const [enforceTransition, setEnforceTransition] = useState(false);

    const [current, setCurrent] = useState(initialIndex);
    const [modalRef, setModalRef] = useState<HTMLElement | null>(null);
    const [imageViewRef, setImageViewRef] = useState<HTMLImageElement | HTMLElement | null>(null);
    const [rotate, setRotate] = useState(0);

    const reduce = useImageViewerSetup({ modalRef, imageViewRef, active: !!props.visible });
    const [info, dispatch] = reduce;
    const { zoomActive, width, height, left, top } = info;
    const imageStyle = {
        width,
        height,
        marginLeft: left,
        marginTop: top,
        transform: `rotate(-${rotate * 90}deg)`,
    };

    const onLoadCallback = useCallback(
        (e: React.SyntheticEvent<HTMLImageElement>) => {
            setLoading(false);
            dispatch({ type: 'initialize', data: e.target as HTMLImageElement });
        },
        [dispatch]
    );

    const onToolbarEvent = useCallback(
        (e: ToolbarEvent) => {
            switch (e) {
                case 'zoomin':
                    if (loading === null) break;
                    setEnforceTransition(true);
                    dispatch({ type: 'scale', factor: 0.2 });
                    break;
                case 'zoomout':
                    if (loading === null) break;
                    setEnforceTransition(true);
                    dispatch({ type: 'scale', factor: -0.2 });
                    break;
                case 'fitscreen':
                    dispatch({ type: 'reset', initial: false });
                    break;
                case 'original':
                    dispatch({ type: 'reset', initial: true });
                    break;
                case 'rotate':
                    if (loading === null) break;
                    setRotate((rotate) => rotate + 1);
                    break;
                case 'next':
                    if (current + 1 === images.length) break;
                    setLoading(true);
                    setCurrent((current) => current + 1);
                    break;
                case 'prev':
                    if (current === 0) break;
                    setLoading(true);
                    setCurrent((current) => current - 1);
                    break;
                default:
                    break;
            }
        },
        [dispatch, images, current, loading]
    );

    useEffect(() => {
        if (!modalRef) return undefined;
        const callbackA = debounce(() => enforceActive.current === false && setControlActive(false), 1000);
        const callbackB = () => setControlActive(true);
        modalRef.addEventListener('mousemove', callbackA);
        modalRef.addEventListener('mousemove', callbackB);
        return () => {
            modalRef.removeEventListener('mousemove', callbackA);
            modalRef.removeEventListener('mousemove', callbackB);
        };
    }, [modalRef]);

    return (
        <PlainModal
            transitionName="fade"
            maskStyle={{ backgroundColor: 'rgba(0,0,0,.85)' }}
            contentFullScreen
            {...dialogProps}
        >
            <div style={{ width: '100%', height: '100%' }} ref={setModalRef} onClick={props.onClose}>
                {loading && (
                    <div className={classNames(classes.control, 'active', classes.loading)}>
                        <LoadingOutlined />
                    </div>
                )}
                <div className={classNames(classes.control, 'active')}>
                    {loading === null ? (
                        <div className={classes.errorWrapper}>
                            <FrownOutlined />
                        </div>
                    ) : (
                        <img
                            ref={setImageViewRef}
                            className={classNames({
                                [classes.hidden]: loading,
                                [classes.transition]: enforceTransition,
                            })}
                            onTransitionEnd={() => setEnforceTransition(false)}
                            style={imageStyle}
                            src={images[current]}
                            alt=""
                            onLoad={onLoadCallback}
                            onError={() => setLoading(null)}
                        />
                    )}
                </div>
                <div className={classNames(classes.control, { active: controlActive || zoomActive })}>
                    <ClickStopper>
                        <ImageViewerToolbar
                            onMouseEnter={() => (enforceActive.current = true)}
                            onMouseLeave={() => (enforceActive.current = false)}
                            className={classes.toolbar}
                            onEvent={onToolbarEvent}
                            current={images.length ? current + 1 : 0}
                            total={images.length}
                            zoomLevel={(info.width ?? 1) / (info.naturalWidth || 0.1)}
                        />
                    </ClickStopper>
                    <ImageViewerToolbarClose
                        onMouseEnter={() => (enforceActive.current = true)}
                        onMouseLeave={() => (enforceActive.current = false)}
                        className={classes.closeIcon}
                    />
                </div>
            </div>
        </PlainModal>
    );
}
