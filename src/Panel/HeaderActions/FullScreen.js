import React, { useState } from 'react';
import { HeaderAction } from './HeaderAction';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import app from '../../Base/App';

const FullScreen = () => {

    const [isFullScreen, setIsFullScreen] = useState(document.webkitIsFullScreen);

    return <HeaderAction
        title="Full screen"
        icon={
            isFullScreen
                ?
                FullscreenExitIcon
                :
                FullscreenIcon
        }
        action={() => {
            if (document.fullscreenEnabled) {
                if (document.webkitIsFullScreen) {
                    document.exitFullscreen();
                    setIsFullScreen(false);
                } else {
                    document.documentElement.requestFullscreen();
                    setIsFullScreen(true);
                }
            } else {
                app.warning("Your browser does not support fullscreen.");
            }
        }}
    />
}

export { FullScreen }