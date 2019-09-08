import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API from '../environment.js'


interface MyBook {
    name: string,
    description: string,
    progress: number,
    id: string
}

const Book = function(props: {book: MyBook, key: string}){ (
    <tr>
        <td>{props.book.name}</td>
        <td>{props.book.description}</td>
        <td>{props.book.progress}</td>
        <td>
            <Link to={"/edit/"+props.book.id}>Edit</Link>
        </td>
    </tr>
)
}

export default class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {books: []};
    }
    componentDidMount() {
        axios.get(API + 'books')
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
                            <th> </th>
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