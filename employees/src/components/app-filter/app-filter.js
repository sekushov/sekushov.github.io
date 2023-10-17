import './app-filter.css';

const AppFilter = ({filter, onSelectFilter}) => {
    const btnsData = [
        {name: 'all', label: 'Все сотрудники'},
        {name: 'rise', label: 'На повышение'},
        {name: 'salaryMore100000', label: 'З/П больше 100 000'}
    ];
    const buttons = btnsData.map(item => {
        const active = filter === item.name,
              clazz = active ? "btn-light" : "btn-outline-light";
        return (
            <button 
                className={"btn " + clazz}
                type="button"
                key={item.name}
                name={item.name}
                onClick={() => onSelectFilter(item.name)}>
                    {item.label}
            </button>
        )
    })
        
    return (
        <div className="btn-group filter-btns">
            {buttons}
        </div>
    )
}

export default AppFilter;