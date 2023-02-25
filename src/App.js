import React, { Component } from "react";
import initialData from './data';
import EmployeeList from './EmployeeList';
import TopBar from "./TopBar";
import AddEditForm from "./AddEditForm";

const trueFalseOptions = [
    { id: 'true', value: true },
    { id: 'false', value: false }
]

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      employee: initialData,
      searchEmployee: [],
      showForm: false,
      name: null,
      workTime: null,
      attendance: null,
      date: null,
      editId: null,
      isSearch: false
    }
  }

  render() {
    const {
        employee,
        searchEmployee,
        showForm,
        name,
        workTime,
        attendance,
        date,
        editId,
        isSearch
    } = this.state;

      const displayEmployee = (searchEmployee.length || isSearch) ? searchEmployee : employee;

      return(
        <div>
            {/*显示top bar*/}
            <TopBar
                onFilter={({ searchEmployee, isSearch }) => this.setState({ searchEmployee, isSearch })}
                employee={employee}
                showForm={showForm}
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
                }}
            />

            {/*添加/修改 的表单*/}
            { showForm &&
                <AddEditForm
                    onAddEdit={(employee => this.setState({
                        employee,
                        showForm: false,
                        name: null,
                        workTime: null,
                        attendance: null,
                        date: null,
                        editId: null
                    }))}
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
