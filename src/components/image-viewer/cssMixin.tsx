const viewerMixinStyle = {
    size24: {
        width: 24,
        height: 24,
        borderRadius: 4,
    },
    flex: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    hover: {
        transition: 'background-color 0.5s ease',

        '&:hover': {
            backgroundColor: 'hsla(0,0%,100%,.2)',
        },
    },
};

export default viewerMixinStyle;
