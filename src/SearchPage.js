import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Shelf from './Shelf';
import * as BooksAPI from './BooksAPI';

class SearchPage extends React.Component {
    state = {
        query: '',
        results: []
    };

    clearResults = () => {
        this.setState({results: []})
    };

    onSearch = (query) => {
        this.setState({ query })
        if (query.length > 0) {
            BooksAPI.search(query).then(res => {
                if (!res.error) {
                    this.setState({results: res.filter(r => r.imageLinks)})
                }
                else {
                    this.clearResults();
                }
            });
        }
        else {
            this.clearResults();
        }
    };

    render() {
        const books = this.state.results.map(book => {
            const bookOnShelf = this.props.books.find(b => b.id === book.id);
            if (bookOnShelf) {
                book.shelf = bookOnShelf.shelf;
            }
            return book;
        });

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               placeholder="Search by title or author"
                               onChange={(e) => this.onSearch(e.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.results.length !== 0 ?
                            <Shelf
                                books={books}
                                onShelfChange={this.props.onShelfChange}
                                title='Search Results' />
                        : (this.state.query.length !== 0 && this.state.results.length === 0 &&
                            <div>No book found.</div>
                        )}
                </div>
            </div>
        );
    }
}

SearchPage.propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
};

export default SearchPage;