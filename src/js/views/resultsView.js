import View from "./View";
import icons from "url:../../img/icons.svg"
class ResultsView extends View {
    _parentElement = document.querySelector(".results")
    _message = ""
    _errorMessage = "No recipes found for your query! Please try again"



    _generateMarkup() {
        return this._data.map(this._generateMarkupPreview).join("")
    }
    _generateMarkupPreview(result) {
        //preview__link--active
        /*

         <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>

         */
        return `   <li class="preview">
            <a class="preview__link" href="#${result.id}">
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

export default new ResultsView()