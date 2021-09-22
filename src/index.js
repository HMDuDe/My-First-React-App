import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Table extends React.Component
{
    constructor(props) {
        super(props);
        
        this.state = { 
            netSalary: 15000,
            currBalance: null,
            description: '',
            amount: null,
            entries: [],
            totalExpenses: null
        };

        this.saveEntryOnSubmit = this.saveEntryOnSubmit.bind(this);
        this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
        this.amountChangeHandler = this.amountChangeHandler.bind(this);
        this.table = this.table.bind(this);
    }

    buttonSet() {
        return (
            <div className="buttonSet">
                <form>
                    <input type="text" onChange={this.descriptionChangeHandler} placeholder="Description" />
                    <input type="number" onChange={this.amountChangeHandler} placeholder="Amount" />
                    <br />

                    <button type="button" onClick={this.saveEntryOnSubmit}>
                        Add Expense
                    </button>
                </form>
            </div>
        );
    }

    table() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Remaining</th>
                    </tr>
                </thead>

                <tbody id="table-body">
                    {this.state.entries.map(entry => {return this.loadTableEntry(entry);})}
                </tbody>
            </table>
        );
    }

    componentDidUpdate() {
        this.state.entries.map(entry => {
            return this.loadTableEntry(entry);
        });
    }

    loadTableEntry(entry) {
        if(entry[2] < 0){
            return (
                <tr style={{color: "red"}}>
                    <td><i>{entry[0]}</i></td>
                    <td className="amount">R {entry[1]}</td>
                    <td className="balance">R {entry[2]}</td>
                </tr>
            );
        }else{
            return (
                <tr>
                    <td><i>{entry[0]}</i></td>
                    <td className="amount">R {entry[1]}</td>
                    <td className="balance">R {entry[2]}</td>
                </tr>
            );
        }
    }

    componentDidMount() {
        if(this.state.currBalance == null) {
            let currentBalance = this.state.netSalary;
            this.setState({ currBalance: currentBalance });
        }
    }
 
    render() {
        return (
            <div>
                <h1>Budget Calculator</h1>
                <hr />
                {/* Button set */}
                {this.buttonSet()}

                {/* Render Table */}
                {this.table()}

                <div style={{textAlign: "end"}} id="total">
                    <b>Total Expenses: R </b> {this.state.totalExpenses}
                </div>
            </div>
        );
    }

    descriptionChangeHandler(event) {
        this.setState({ description: event.target.value})
    }

    amountChangeHandler(event) {
        this.setState({ amount: event.target.value})
    }

    // Back-end functions
    saveEntryOnSubmit() {
        let tempArr = this.state.entries;
        let newBalance = this.state.currBalance - this.state.amount;
        let expensesSum;

        tempArr.push([
            this.state.description, 
            this.state.amount,
            newBalance
        ]);

        if(this.state.entries.length > 0) {
            expensesSum = this.state.entries.map(entry => {
                return entry[1];
            }).reduce((total, current) => (parseInt(total) + parseInt(current)));
        }else{
            expensesSum = 0;
        }

        this.setState({
            entries: tempArr,
            currBalance: newBalance,
            totalExpenses: expensesSum
        });

        Array.from(document.querySelectorAll('input')).forEach(input => (input.value = ''));
    }
}

ReactDOM.render(<Table />, document.getElementById('root'));