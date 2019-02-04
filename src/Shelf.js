import React from 'react';
import PropTypes from 'prop-types';
import BookList from './BookList'

function Shelf(props) {
    const { title, books, onShelfChange } = props;

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <BookList
                    books={books}
                    onShelfChange={onShelfChange} />
            </div>
        </div>
    );
}

Shelf.propTypes = {
    title: PropTypes.string,
    books: PropTypes.array,
    onShelfChange: PropTypes.func
};

export default Shelf;