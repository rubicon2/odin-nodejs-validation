function match(input, searchTerm) {
  // Make sure we do not match against an empty input, as for some reason js says that all strings include ''.
  if (
    input.length > 0 &&
    searchTerm.length > 0 &&
    input.toLowerCase().includes(searchTerm.toLowerCase())
  ) {
    return {
      match: true,
      completeMatch: searchTerm.length === input.length,
      rating: searchTerm.length > 0 ? searchTerm.length / input.length : 0,
    };
  } else {
    return {
      match: false,
      completeMatch: false,
      rating: 0,
    };
  }
}

module.exports = match;
