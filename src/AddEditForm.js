import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

class AddEditForm extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {
            name,
            workTime,
            attendance,
            date,
            editId,
            onCustomizeValueChange,
            onCustomizeCancel,
            onAddEdit,
            employee
        } = this.props;
        return (

            <Box sx={style}>
                <Modal
                    open={true}
                    onClose={() => onCustomizeCancel()}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div>
                        <FormControl fullWidth>
                            <TextField
                                id="name"
                                label="姓名"
                                variant="standard"
                                value={name}
                                onChange={evt => onCustomizeValueChange({ name: 'name', value: evt.target.value })}
                            />
                        </FormControl>
                        <br/> <br/>
                        <FormControl fullWidth>
                            <TextField
                                id="workTime"
                                label="工时"
                                variant="standard"
                                onChange={evt => onCustomizeValueChange({ name: 'workTime', value: evt.target.value })}
                                value={workTime}
                            />
                        </FormControl>
                        <br/> <br/>
                        <FormControl fullWidth>
                            <InputLabel id="attendance-label">出勤</InputLabel>
                            <Select
                                value={attendance}
                                onChange={evt => onCustomizeValueChange({ name: 'attendance', value: evt.target.value })}
                                labelId="attendance-label"
                                id="attendance-label"
                                variant="standard"
                                label="出勤"
                            >
                                <MenuItem value={false}></MenuItem>
                                <MenuItem value={true}>是</MenuItem>
                                <MenuItem value={false}>否</MenuItem>
                            </Select>
                        </FormControl>
                        <br/> <br/>
                        <FormControl fullWidth>
                            <TextField
                                id="date"
                                label="日期"
                                variant="standard"
                                onChange={evt => onCustomizeValueChange({ name: 'date', value: evt.target.value })}
                                value={date}
                            />
                        </FormControl>
                        <br /> <br />
                        <FormControl fullWidth>
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() => onCustomizeCancel()}
                            >取消</Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    if (!editId) {
                                        // 添加操作
                                        let createId = 0;
                                        employee.map(item => {
                                            if (item.id > createId) {
                                                createId = item.id;
                                            }
                                        });
                                        const newEmp = {
                                            id: createId+1,
                                            name,
                                            date,
                                            attendance,
                                            workTime
                                        };
                                        employee.push(newEmp);
                                        onAddEdit(employee);
                                    } else {
                                        // 修改操作
                                        // 1> 知道哪一行要改！     editId
                                        // 2> 遍历所有的employee, 发现需要改的行 然后更改数据
                                        const editedEmployee = employee.map(emp => {
                                            if (emp.id === editId) {
                                                emp.name = name;
                                                emp.date = date;
                                                emp.attendance = attendance;
                                                emp.workTime = workTime;
                                            }
                                            return emp;
                                        })
                                        onAddEdit(editedEmployee);
                                    }
                                }
                                }
                            >{editId ? '修改' : '添加'}</Button>
                        </FormControl>
                    </div>
                </Modal>
            </Box>

        )
    }
}

export default AddEditForm;
