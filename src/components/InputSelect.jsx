import React from 'react';
import { TextField } from '@material-ui/core'

class InputSelect extends React.Component {
    constructor() {
        super();
        let state = {value: null}

    }


    render() {
        return (
            <div><TextField {...this.props} /></div>
        );
    }

}


export default InputSelect;