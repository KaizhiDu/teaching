import React, { Component } from "react";

class EmployeeList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { employee, onCustomizeDelete, onCustomizeEdit } = this.props;
        return (
            <ul>
                {employee.map(item => {
                    const { id, name, workTime, attendance, date } = item;
                    return<li>
                        ID: {id}
                        姓名: {name}
                        工时: {workTime}
                        出勤: {attendance ? '是' : '否'}
                        日期: {date}
                        <button
                            onClick={() => onCustomizeEdit({
                                showForm: true,
                                name,
                                workTime,
                                attendance,
                                date,
                                editId: id
                            })}
                        >
                            修改
                        </button>
                        <button
                            onClick={() => onCustomizeDelete(id)}
                        >
                            删除
                        </button>
                    </li>
                })}
            </ul>
        )
    }
}

export default EmployeeList;
