import View from "./View";
class BookmarksView extends View {
    _parentElement = document.querySelector(".bookmarks__list")
    _message = ""
    _errorMessage = "No bookmarks yet."



    _generateMarkup() {
        return this._data.map(this._generateMarkupPreview).join("")
    }
    _generateMarkupPreview(result) {
        const id = window.location.hash.slice(1)
        /*

         <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>

         */
        return `   <li class="preview">
            <a class="preview__link ${result.id === id ? "preview__link--active" : ""}" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
               
              </div>
            </a>
          </li>`
    }

}

export default new BookmarksView()