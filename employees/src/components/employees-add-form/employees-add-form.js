import { Component } from 'react';

import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }
    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value       // в скобках записывают свойства в объект в ES6. e.target.name прописаны в верстке и совпадают с именами в state
        })
    }

    render() {
        const {onAdd} = this.props,
              {name, salary} = this.state;
        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form className="add-form d-flex" onSubmit={(e) => onAdd(e, name, salary)}>
                    <input 
                        type="text" 
                        className="form-control new-post-label"
                        placeholder="Как его зовут"
                        name="name"
                        value={name}                            // управляемый элемент. Так управляется реактом и улучшается код
                        onChange={this.onValueChange} />
                    <input 
                        type="number" 
                        className="form-control new-post-label"
                        placeholder="З/П (руб)"
                        name="salary"
                        value={salary}
                        onChange={this.onValueChange} />
                    <button 
                        type="submit" 
                        className="btn btn-outline-light">Добавить</button>
                </form>
                <div className="formWrongText"></div>
            </div>
        );
    }
}

export default EmployeesAddForm;