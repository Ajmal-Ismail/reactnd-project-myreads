import React from 'react';
import PropTypes from 'prop-types';
import Shelf from './Shelf';
import { Link } from "react-router-dom";
import { SHELVES } from "./Utils";

class MainPage extends React.Component {
    render() {
        const { books, onShelfChange } = this.props;

        return (
            <div className="main-page">
                <div className="main-page-title">
                    <h1>MyReads</h1>
                </div>
                <div className="main-page-content">
                    {SHELVES.map(shelf => (
                        <Shelf
                            key={shelf.key}
                            title={shelf.title}
                            books={books.filter(book => book.shelf === shelf.key)}
                            onShelfChange={onShelfChange}/>
                    ))}
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        );
    }
}

MainPage.propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
};

export default MainPage;