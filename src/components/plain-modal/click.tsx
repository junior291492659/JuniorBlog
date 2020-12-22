import React from 'react';

interface ClickStopperProps {
    children: React.ReactElement;
}

const stopClick = (e: React.MouseEvent) => e.stopPropagation();

const ClickStopper = function ClickStopper({ children }: ClickStopperProps) {
    return React.cloneElement(children, { onClick: stopClick });
};

export default ClickStopper;
