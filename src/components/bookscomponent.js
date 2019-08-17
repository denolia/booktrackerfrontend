import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Book = props => (
    <tr>
        <td>{props.book.name}</td>
        <td>{props.book.description}</td>
        <td>{props.book.progress}</td>
        <td>
            <Link to={"/edit/"+props.book._id}>Edit</Link>
        </td>
    </tr>
)

export default class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {books: []};
    }
    componentDidMount() {
        axios.get('http://192.168.1.45:8080/books')
            .then(response => {
                this.setState({ books: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }
    bookList() {
        return this.state.books.map(
            function(currentBook, i){
            return <Book book={currentBook} key={i} />;
        })
    }
    render() {
        return (
            <div>
                <h3>Books List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.bookList() }
                    </tbody>
                </table>
            </div>
        )
    }
}