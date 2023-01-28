import React, { Component } from "react";
import initialData from './data';
import EmployeeList from './EmployeeList';

const trueFalseOptions = [
    { id: 'true', value: true },
    { id: 'false', value: false }
]

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      employee: initialData,
      showForm: false,
      name: null,
      workTime: null,
      attendance: null,
      date: null,
      editId: null
    }
  }

  render() {
    const {
        employee,
        showForm,
        name,
        workTime,
        attendance,
        date,
        editId
    } = this.state;
    return(
        <div>
            <button
              onClick={() => {
                  this.setState({
                      employee,
                      showForm: !showForm,
                      editId: null
                  });
              }}
            >
                添加
            </button>

            {/*显示员工列表*/}
            <EmployeeList
                employee={employee}
                onCustomizeEdit={entity => {
                    const { showForm, name, workTime, attendance, date, editId } = entity || {};
                    this.setState({ showForm, name, workTime, attendance, date, editId });
                }}
                onCustomizeDelete={needToDeleteId => {
                    const afterDeletedEmployee = employee.filter(emp => emp.id !== needToDeleteId);
                    this.setState({
                        employee: afterDeletedEmployee
                    })
                }}
            />

            {/*添加/修改 的表单*/}
            { showForm &&
                <div>
                    姓名: <input
                        onChange={evt => {
                            this.setState({
                                name: evt.target.value
                            })
                        }}
                    value={name} />
                    <br/>
                    工时: <input
                    onChange={evt => {
                        this.setState({
                            workTime: evt.target.value
                        })
                    }}
                    value={workTime} />
                    <br/>
                    出勤:
                    <select
                        value={attendance}
                        onChange={evt => {
                        this.setState({
                            attendance: evt.target.value
                        })
                    }}>
                        <option value={false}></option>
                        <option value={true}>是</option>
                        <option value={false}>否</option>
                    </select>
                    <br/>
                    日期: <input
                    onChange={evt => {
                        this.setState({
                            date: evt.target.value
                        })
                    }}
                    value={date} />
                    <br/>
                    <button
                        onClick={() => this.setState({ showForm: false })}
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
                                this.setState({
                                    employee,
                                    showForm: false
                                })
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

                                this.setState({
                                    employee: editedEmployee,
                                    showForm: false
                                })


                            }
                        }
                    }
                    >
                        {editId ? '修改' : '添加'}
                    </button>
                </div>
            }
        </div>
    )
  }
}


export default App;
