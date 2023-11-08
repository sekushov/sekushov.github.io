import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [],
            term: '',
            filter: 'all'
        } 
    }
   
    componentDidMount = () => {
        if (!localStorage.getItem('data')) {
            fetch("/data.json")
                .then(response => response.json())
                .then(json => {
                    this.setState({
                        data: json.data
                    });
                }).catch(() => console.log('Что-то пошло не так'));
        }
    }

    deleteItem = async (id) => {
        await this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        });
        localStorage.setItem("data", JSON.stringify(this.state.data));
    }

    onChangeSalary = async (id, newSalary) => {
        await this.setState(({data}) => {
            return {
                data: data.map(item => {
                    if (item.id === id && item.salary !== newSalary) {
                        return {...item, salary: +newSalary}
                    } 
                    return item
                })
            }
        });
        localStorage.setItem("data", JSON.stringify(this.state.data));
    }

    addItem = async (e, name, salary) => {
        e.preventDefault();
        let maxId = 0;
        this.state.data.forEach(item => {
            if (maxId < item.id) {
                maxId = item.id
            }
        });
        const wrongText = document.querySelector('.formWrongText');
        if (name.length < 3 || salary < 100 || name.match(/\d/g)) {
            if (wrongText.textContent === '') {
                wrongText.textContent = 'Данные некорректны';
                setTimeout(() => {wrongText.textContent = ''}, 3000);
            }
        } else {
            await this.setState(({data}) => {
                return {
                    data: data.concat({name: name, salary: +salary, increase: false, rise: false, id: maxId + 1})
                }
            });
            localStorage.setItem("data", JSON.stringify(this.state.data));

        }
    }

    onToggleProp = async (id, prop) => {
        await this.setState(({data}) => ({
            data: data.map(item => {
                if (id === item.id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item
            })
        }));
        localStorage.setItem("data", JSON.stringify(this.state.data));
    }

    onChangeSearch = (term) => {
        this.setState({term})
    }
    searchEmployees = (items, term) => {
        if (term === '') {
            return items
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        });
    }

    onSelectFilter = (filter) => {
        this.setState({filter})
    }
    filterEmployees = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => {
                    return item[filter];
                });
            case 'salaryMore100000':
                return items.filter(item => {
                    return item.salary > 100000
                });
            default:
                return items
        }
    }


    render() {
        const {data, term, filter} = this.state;
        const visibleData = this.filterEmployees(this.searchEmployees(data, term), filter);

        return (
            <div className="app">
                <AppInfo 
                    employees={data.length}
                    increased={data.filter(item => item.increase).length}/>
    
                <div className="search-panel">
                    <SearchPanel 
                        onChangeSearch={this.onChangeSearch}/>
                    <AppFilter
                        filter={filter}
                        onSelectFilter={this.onSelectFilter}/>
                </div>
    
                <EmployeesList 
                    data={visibleData} 
                    onDelete={this.deleteItem} 
                    onToggleProp={this.onToggleProp} 
                    onChangeSalary= {this.onChangeSalary}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App;