import React, { Component } from "react";

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
            <div>
                姓名: <input
                onChange={evt => onCustomizeValueChange({ name: 'name', value: evt.target.value })}
                value={name} />
                <br/>
                工时: <input
                onChange={evt => onCustomizeValueChange({ name: 'workTime', value: evt.target.value })}
                value={workTime} />
                <br/>
                出勤:
                <select
                    value={attendance}
                    onChange={evt => onCustomizeValueChange({ name: 'attendance', value: evt.target.value })}
                >
                    <option value={false}></option>
                    <option value={true}>是</option>
                    <option value={false}>否</option>
                </select>
                <br/>
                日期: <input
                onChange={evt => onCustomizeValueChange({ name: 'date', value: evt.target.value })}
                value={date} />
                <br/>
                <button
                    onClick={() => onCustomizeCancel()}
                >取消</button>
                <button
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
                >
                    {editId ? '修改' : '添加'}
                </button>
            </div>
        )
    }
}

export default AddEditForm;
