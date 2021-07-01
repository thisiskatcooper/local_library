// Function: Find Authors By ID (used .find to return first matching result)
function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

// Function: Find Books By ID (used .find to return first matching result)
function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

// Function: Partition Books By Borrowed Status (used two arrays to push results and partition)
function partitionBooksByBorrowedStatus(books) {
  let borrowed = [];
  let available = [];
  for (let book of books) {
    if (book.borrows[0].returned === true) {
      available.push(book);
    }
    if (book.borrows[0].returned === false) {
      borrowed.push(book);
    }
  }
  return [borrowed, available];
}

// Function: Find Account By ID (used .find to return first matching result)
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

// Function: Get Borrowers For Book (used .map, .slice, spread)
function getBorrowersForBook(book, accounts) {
  const cappedBorrows = book.borrows.slice(0, 10);
  const combinedBorrows = cappedBorrows.map((borrow) => {
    const account = findAccountById(accounts, borrow.id);
    const combined = {
      ...borrow,
      ...account,
    };
    return combined;
  });
  return combinedBorrows;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
