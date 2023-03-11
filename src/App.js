import React, { Component } from "react";
import EmployeeList from './EmployeeList';
import TopBar from "./TopBar";
import AddEditForm from "./AddEditForm";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      employee: JSON.parse(localStorage.getItem('employee')) || [],
      showForm: false,
      name: null,
      workTime: null,
      attendance: null,
      date: null,
      editId: null,
      isSearch: false,
      searchContent: null
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
        editId,
        searchContent
    } = this.state;

      const searchEmployee = employee.filter(emp => {
          const { name } = emp || {};
          if (name.includes(searchContent)) {
              return true;
          } else {
              return false;
          }
      })

      const displayEmployee = searchContent ? searchEmployee : employee;

      return(
        <div>
            {/*显示top bar*/}
            <TopBar
                employee={employee}
                showForm={showForm}
                onSearchChange={value => {
                    this.setState({
                        searchContent: value
                    })
                }}
                onCustomizeAdd={entity => this.setState({
                    showForm: !entity.showForm,
                    editId: null
                })}
            />

            {/*显示员工列表*/}
            <EmployeeList
                employee={displayEmployee}
                onCustomizeEdit={entity => {
                    const { showForm, name, workTime, attendance, date, editId } = entity || {};
                    this.setState({ showForm, name, workTime, attendance, date, editId });
                }}
                onCustomizeDelete={needToDeleteId => {
                    const afterDeletedEmployee = employee.filter(emp => emp.id !== needToDeleteId);
                    this.setState({
                        employee: afterDeletedEmployee
                    })
                    localStorage.setItem('employee', JSON.stringify(afterDeletedEmployee));
                }}
            />

            {/*添加/修改 的表单*/}
            { showForm &&
                <AddEditForm
                    onAddEdit={(employee => {
                        this.setState({
                            employee,
                            showForm: false,
                            name: null,
                            workTime: null,
                            attendance: null,
                            date: null,
                            editId: null
                        })
                        localStorage.setItem('employee', JSON.stringify(employee))
                    } )}
                    onCustomizeCancel={() => this.setState({ showForm: false })}
                    onCustomizeValueChange={entity => {
                        const { name, value } = entity || {};
                        this.setState({
                            [name]: value
                        })
                    }}
                    name={name}
                    workTime={workTime}
                    attendance={attendance}
                    date={date}
                    editId={editId}
                    employee={employee}
                />
            }
        </div>
    )
  }
}


export default App;
