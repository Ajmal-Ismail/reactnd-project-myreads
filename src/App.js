import React from 'react'
import { Route } from "react-router-dom";
import MainPage from './MainPage'
import SearchPage from './SearchPage'
import * as BooksAPI from "./BooksAPI";
import './App.css'

class BooksApp extends React.Component {
    state = {
        books: []
    };

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({
                books: books
            });
        });
    }

    onShelfChange = (newShelf, book) => {
        BooksAPI.update(book, newShelf).then(() => {
            book.shelf = newShelf;

            this.setState(oldState => ({
                books: [...oldState.books.filter(b => b.id !== book.id), book]
            }));
        })
    };

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() =>
                    <MainPage books={this.state.books} onShelfChange={this.onShelfChange} />
                } />
                <Route path='/search' render={() =>
                    <SearchPage books={this.state.books} onShelfChange={this.onShelfChange} />
                } />
            </div>
        )
    }
}

export default BooksApp
