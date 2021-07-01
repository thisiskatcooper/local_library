// Function: Find Account By ID (used .find to return first matching result)
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

// Function: Sort Accounts By Last Name (used .sort to compare last names and sort)
function sortAccountsByLastName(accounts) {
  return accounts.sort((person1, person2) =>
    person1.name.last > person2.name.last ? 1 : -1
  );
}

// Function: Get Total Number of Borrows (used .reduce, .filter, .length)
function getTotalNumberOfBorrows(account, books) {
  if (!account || !books || books.length === 0) return 0;
  const totalBorrowCount = books.reduce((totalForAccount, book) => {
    const borrows = book.borrows;
    const filteredBorrows = borrows.filter(
      (borrow) => borrow.id === account.id
    );
    totalForAccount += filteredBorrows.length;
    return totalForAccount;
  }, 0);
  return totalBorrowCount;
}

// Function: Get Books Possessed By Account (used .filter, .map, spread)
function getBooksPossessedByAccount(account, books, authors) {
  const filteredBooks = books.filter(
    (book) =>
      book.borrows[0].returned === false && book.borrows[0].id === account.id
  );
  const combinedBookArray = filteredBooks.map((book) => {
    const authorValue = authors.find((author) => author.id === book.authorId);
    const combinedBook = {
      ...book,
      author: authorValue,
    };
    return combinedBook;
  });
  return combinedBookArray;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
