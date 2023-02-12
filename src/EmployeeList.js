import React, { Component } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

class EmployeeList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { employee, onCustomizeDelete, onCustomizeEdit } = this.props;
        return (
            <div>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">姓名</TableCell>
                            <TableCell align="right">工时</TableCell>
                            <TableCell align="right">出勤</TableCell>
                            <TableCell align="right">日期</TableCell>
                            <TableCell align="right">操作</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employee.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.workTime}</TableCell>
                                <TableCell align="right">{row.attendance ? '出勤': '没出勤'}</TableCell>
                                <TableCell align="right">{row.date}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="outlined"
                                        onClick={() => onCustomizeEdit({
                                            showForm: true,
                                            name: row.name,
                                            workTime: row.workTime,
                                            attendance: row.attendance,
                                            date: row.date,
                                            editId: row.id
                                        })}
                                    >
                                        修改
                                    </Button>
                                    <Button
                                        color="error"
                                        variant="outlined"
                                        onClick={() => onCustomizeDelete(row.id)}
                                    >
                                        删除
                                    </Button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>


        )
    }
}

export default EmployeeList;
