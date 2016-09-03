/* Task Description */
/* 
	*	Create a module for working with books
		*	The module must provide the following functionalities:
			*	Add a new book to category
				*	Each book has unique title, author and ISBN
				*	It must return the newly created book with assigned ID
				*	If the category is missing, it must be automatically created
			*	List all books
				*	Books are sorted by ID
				*	This can be done by author, by category or all
			*	List all categories
				*	Categories are sorted by ID
		*	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
			*	When adding a book/category, the ID is generated automatically
		*	Add validation everywhere, where possible
			*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
			*	Author is any non-empty string
			*	Unique params are Book title and Book ISBN
			*	Book ISBN is an unique code that contains either 10 or 13 digits
			*	If something is not valid - throw Error
*/
function solve() {
	var library = (function () {
		var books = [];
		var categories = [];

		function listBooks(parametur) {
			//check is it empty
			if (books.length === 0) {
				return books;
			}
 			//check is sorting by category
			if (parametur !== undefined) {
				if (parametur.category !== undefined) {
//suzdavame masiv ot tezi, koito otgovarqt na yslovieto, ako nqma takiva vrushta prazen masiv
				return books.filter(function (book) {
					if (book.category === parametur.category) {
						return book;
					}
				});
				}
				//check is sorting by author
				if (parametur.author !== undefined) {
					return books.filter(function (book) {
						if (book.author === parametur.author) {
						return book;
					}
					});		
				}
			}
			return books;
		}
		function isTitleUnique(title) {
			for (var i = 0, len = books.length; i < len; i+=1) {
				if (books[i].title === title) {
					return true;
				}
				return false;
			}
		}
		function isIBANUnique(iban) {
				for (var i = 0, len = books.length; i < len; i+=1) {
				if (books[i].isbn === iban) {
					return true;
				}
				return false;
			}	
		}

		function addBook(book) {

			book.ID = books.length + 1;
			if (isTitleUnique(book.title)) {
				throw new Error('The title must be unique!');
			}
			if (book.title.length < 2 || book.title.length > 100) {
				throw new Error('The title is too short or too long!');
			}
			if (!book.author) {
				throw new Error('Author is any non-empty string');
			}
			var tempIban = book.isbn;
			if (isIBANUnique(tempIban)) {
				throw new Error('The IBAN must be a unique!');
			}
			if (tempIban.length != 10 && tempIban.length != 13) {
				throw new Error('Book ISBN must contains either 10 or 13 digits!');
			}
			books.push(book);
            if (!(categories.indexOf(book.category) > -1)) {
                if (!isTitleUnique(book.category)) {
                    var category = book.category;
                    category.ID = categories.length + 1;
                    categories.push(category);
                }
            }
			return book;
		}

		function listCategories() {
			return categories;
		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	} ());
	return library;
}
module.exports = solve;
