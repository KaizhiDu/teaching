import React, { Component } from "react";
import Button from '@mui/material/Button';

class TopBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { showForm, onCustomizeAdd } = this.props;
        return (
            <Button
                variant="contained"
                color="success"
                onClick={() => onCustomizeAdd({ showForm })}
            >
                添加
            </Button>
        )
    }
}

export default TopBar;
