import React from 'react';
import { SHELVES } from './Utils';
import PropTypes from 'prop-types';

class Book extends React.Component {
    onShelfChange = (e) => {
        this.props.onShelfChange(e.target.value, this.props.book)
    };

    render() {
        const { book } = this.props;
        const style = {
            width: 128,
            height: 193,
            backgroundImage: 'url(' + book.imageLinks.smallThumbnail +')'
        };

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={style}></div>
                    <div className="book-shelf-changer">
                        <select value={book.shelf || 'none'} onChange={this.onShelfChange}>
                            <option value="move" disabled>Move to...</option>
                            {SHELVES.map(shelf => (
                                <option
                                    key={shelf.key}
                                    value={shelf.key}>{shelf.title}</option>
                            ))}
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors.join(", ") : "N/A"}</div>
            </div>
        );
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired
};

export default Book;