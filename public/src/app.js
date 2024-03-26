// Get the modal
var modal = document.getElementById("id01");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

class User {
  constructor(username, password, email) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  getUserName() {
    return this.username;
  }
}

var user1 = new User("catDadDan", "catDaddy", "catsRkool@sbcglobal.com");
console.log(user1);
console.log("Testing username getter: " + user1.getUserName());

var MovieRental = {
  genre: ["horror", "comedy", "action", "rom-com"],
  film: ["Hereditary", "Ace Ventura", "Batman", "Love Actually"],
  getMovieByGenre(genre) {
    const index = this.genre.indexOf(genre.toLowerCase());
    if (index !== -1) {
      return this.film[index];
    } else {
      return "Please choose between horror, comedy, action, or rom-com";
    }
  },
};

console.log(MovieRental);
console.log("Renting a horror movie: " + MovieRental.getMovieByGenre("horror"));
