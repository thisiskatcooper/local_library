// Function: Get Total Books Count (used .length)
function getTotalBooksCount(books) {
  return books.length;
}

// Function: Get Total Accounts Count (used .length)
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

// Function: Get Books Borrow Count (used: for each)
function getBooksBorrowedCount(books) {
  let checkedOut = 0;
  books.forEach((book) => {
    if (book.borrows[0].returned === false) {
      checkedOut++;
    }
  });
  return checkedOut;
}

// Function: Get Most Common Genres (used .reduce, .map, .slice)
function getMostCommonGenres(books) {
  const genreCount = books.reduce((genres, book) => {
    if (genres[book.genre]) genres[book.genre]++;
    else genres[book.genre] = 1;
    return genres;
  }, {});
  const popularGenres = Object.keys(genreCount).map((key) => {
    return { name: key, count: genreCount[key] };
  });
  popularGenres.sort((book1, book2) => (book1.count > book2.count ? -1 : 1));
  return popularGenres.slice(0, 5);
}

// Function: Get Most Popular Books (used: .map, .sort, .slice)
function getMostPopularBooks(books) {
  // map books and counts
  const booksAndCounts = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));
  booksAndCounts.sort((book1, book2) => (book1.count > book2.count ? -1 : 1));

  return booksAndCounts.slice(0, 5);
}

// Helper Function (used for Get Most Popular Authors, below)
function _sortObjectByValues(obj) {
  const keys = Object.keys(obj);
  return keys.sort((key1, key2) => {
    if (obj[key1] > obj[key2]) {
      return -1;
    } else if (obj[key2] > obj[key1]) {
      return 1;
    } else {
      return 0;
    }
  });
}

// Function: Get Most Popular Authors (used helper function, .reduce, .map, .slice)
function getMostPopularAuthors(books, authors) {
  const count = books.reduce((acc, { authorId, borrows }) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }
    return acc;
  }, {});
  for (let id in count) {
    const sum = count[id].reduce((acc, b) => acc + b);
    count[id] = sum;
  }
  const sorted = _sortObjectByValues(count);
  let arr = sorted.map((authorId) => {
    const {
      name: { first, last },
    } = authors.find(({ id }) => id === Number(authorId));
    let name = `${first} ${last}`;
    return { name, count: count[authorId] };
  });
  return arr.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
  _sortObjectByValues,
};
