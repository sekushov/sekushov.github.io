import { Component } from 'react';

import './employees-list-item.css';

class EmployeesListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            salary: this.props.salary
        }
    }
   
    onChangeSalary = (e) => {
        this.setState({
            salary: +e.target.value
        });
        this.props.onChangeSalary(this.props.id, e.target.value);
    }
    render() {
        const {name, salary, increase, rise, onDelete, onToggleProp} = this.props;
        let liClassNames = "list-group-item d-flex justify-content-between";
        if (increase) {
            liClassNames += " increase";
        }
        if (rise) {
            liClassNames += " like"
        }
        return (
            <li className={liClassNames}>
                <span className="list-group-item-label" 
                    data-toggle="rise" 
                    onClick={onToggleProp} 
                    title="Повысить в должности">{name}</span>
                <div className="list-group-item-input-wrapper">
                    <input type="number" 
                        className="list-group-item-input" 
                        defaultValue={salary}
                        onChange={this.onChangeSalary}/>
                    руб.
                </div>
                
                <div className="d-flex justify-content-center align-items-center">
                    <button className="btn-cookie btn-sm" 
                        data-toggle="increase" 
                        onClick={onToggleProp} 
                        title="Премировать">
                        <i className="fas fa-cookie"></i>
                    </button>
                    <button className="btn-trash btn-sm" onClick={onDelete} title="Удалить">
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        );
    }
}

export default EmployeesListItem;