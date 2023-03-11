import React, { Component, Fragment } from "react";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";

class TopBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { showForm, onCustomizeAdd, onSearchChange, employee } = this.props;
        return (
            <Fragment>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => onCustomizeAdd({ showForm })}
                >
                    添加
                </Button>
                <TextField
                    onChange={evt => {
                        const value = evt.target.value;
                        onSearchChange(value);
                    }}
                    style={{
                        marginLeft: 500
                    }}
                    id="outlined-basic"
                    label="搜索"
                    variant="outlined"
                />
            </Fragment>


        )
    }
}

export default TopBar;
