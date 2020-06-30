const errorHandler = (err) => {
  if (err.message.includes("duplicate key")) {

    if (err.message.includes("login")) {
      return 'This login is already exists';
    } else {
      return 'This email is already exists';
    }
  } else if (err.message.includes('than') || err.message.includes('valid')) {

    if (err.message.includes("login")) {
      return 'Invalid login';
    } else {
      return 'Invalid email';
    }
  } else if (err.message.includes('Cast to ObjectId failed for value')) {
    return 'Invalid Id';
  }
  return '';
}

module.exports = errorHandler;
