
import './employees-list-item.css';

const EmployeesListItem = ({name, salary, increase, rise, onDelete, onToggleProp}) => {
    let liClassNames = "list-group-item d-flex justify-content-between";
    if (increase) {
        liClassNames += " increase";
    }
    if (rise) {
        liClassNames += " like"
    }
    return (
        <li className={liClassNames}>
            <span className="list-group-item-label" data-toggle="rise" onClick={onToggleProp}>{name}</span>
            <input type="text" className="list-group-item-input" defaultValue={salary + ' руб.'} />
            <div className="d-flex justify-content-center align-items-center">
                <button className="btn-cookie btn-sm" data-toggle="increase" onClick={onToggleProp}>
                    <i className="fas fa-cookie"></i>
                </button>
                <button className="btn-trash btn-sm" onClick={onDelete}>
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    );
}

export default EmployeesListItem;