import View from "./View";
import previewView from "./previewView";
class BookmarksView extends View {
    _parentElement = document.querySelector(".bookmarks__list")
    _message = ""
    _errorMessage = "No bookmarks yet."



    _generateMarkup() {
        return this._data.map(result => previewView.render(result, false)).join("")
    }
}

export default new BookmarksView()