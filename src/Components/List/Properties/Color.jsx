import { SketchPicker } from 'react-color';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';

const Color = ({
    column,
    title,
    value,
    action
}) => {

    const [isColorChooserShown, setColorChooserVisibility] = useState(false);

    return <div>
        <Dialog
            onClose={() => setColorChooserVisibility(false)}
            open={isColorChooserShown}
        >
            <SketchPicker />
        </Dialog>
        color
        <span onClick={() => setColorChooserVisibility(true)}>...</span>
    </div>
}

export { Color };