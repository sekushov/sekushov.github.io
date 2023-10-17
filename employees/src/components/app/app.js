import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';



// class WhoAmI extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             age: 25,
//             position: ''
//         };
//     }
//     nextAge = (e, color) => {
//         this.setState(state => ({
//             age: state.age + 1
//         }))
//         console.log(e);
//         console.log(color);
//     }
//     changePosition = (e) => {
//         this.setState({
//             position: e.target.value
//         })
//     }
//     render () {
//         const {name, surname} = this.props,
//               {age, position} = this.state;
//         return (
//             <div>
//                 <h2>My name is {name}, 
//                     surname - {surname}, 
//                     age - {age},
//                     position - {position}
//                 </h2>
//                 <input type="text" onChange={this.changePosition} /> <br/>
//                 <button onClick={(e) => this.nextAge(e, 'some color')}>Возраст меняй</button>
//             </div>
//         )
//     }
// }
// function App() {
//     return (
//         <div className="app">
//             <WhoAmI name="John" surname="Deff" />
//         </div>
//     )
// }









class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Tim', salary: 170000, increase: true, rise: false, id: 1},
                {name: 'Antony', salary: 110000, increase: false, rise: true, id: 2},
                {name: 'Alyosha', salary: 20000, increase: true, rise: false, id: 3}
            ],
            term: '',
            filter: 'all'
        }
    }
    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }
    addItem = (e, name, salary) => {
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
            this.setState(({data}) => {
                return {
                    data: data.concat({name: name, salary: salary, increase: false, rise: false, id: maxId + 1})
                }
            })
        }
    }
    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (id === item.id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item
            })
        }))
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
                    onToggleProp={this.onToggleProp} />
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;