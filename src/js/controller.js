import "core-js/stable"
import "regenerator-runtime/runtime"
import * as model from "./model"
import recipeView from "./views/recipeView"
import searchView from "./views/searchView"
import resultsView from "./views/resultsView"
import paginationView from "./views/paginationView";
import bookmarksView from "./views/bookmarksView";
import addRecipeView from "./views/addRecipeView";
import {MODAL_CLOSE_SEC} from "./config";

//if (module.hot) module.hot.accept()

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1)

    if (!id) return
    recipeView.renderSpinner()
    // 0)
    resultsView.update(model.getSearchResultPage())

    // 1) loading recipe
    await model.loadRecipe(id)

    // 2) Rendering recipe
    recipeView.render(model.state.recipe)

    // 3) Updating bookmarkView
    bookmarksView.update(model.state.bookmarks)
  } catch (e) {
    recipeView.renderError()
  }
}

const controlSearchResults = async function () {
  try {

    resultsView.renderSpinner()
    //get search query
    const query = searchView.getQuery()
    if (!query) return
    //load search
    await model.loadSearchResults(query)
    //render results
    resultsView.render(model.getSearchResultPage())
    //render pagination buttons
    paginationView.render(model.state.search)
  } catch (e) {

  }
}
const controlPagination = function (goToPage) {
  console.log(goToPage)
  //render results
  resultsView.render(model.getSearchResultPage(goToPage))
  //render pagination buttons
  paginationView.render(model.state.search)
}

const controlServings = function (newServings) {
  //updating the recipe servings (in state)
  model.updateServings(newServings)
  //recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const controlAddBookmark = function () {
  // 1) add/remove bookmark
  if (!model.state.recipe.bookmarked) {
  model.addBookmark(model.state.recipe)
  } else {
    model.deleteBookmark(model.state.recipe.id)
  }

  // 2) update recipe view
  recipeView.update(model.state.recipe)

  // 3) render bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function (newRecipe) {
  try {
    //show loading spinner
    addRecipeView.renderSpinner()

    //add new recipe
    await model.uploadRecipe(newRecipe)

    //render recipe
    recipeView.render(model.state.recipe)

    //success message
    addRecipeView.renderMessage()

    //render bookmark view
    bookmarksView.render(model.state.bookmarks)

    //change id in url
    window.history.pushState(null, "", `#${model.state.recipe.id}`)

    //close form window
    setTimeout(function () {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000)
  } catch (e) {
    addRecipeView.renderError(e.message)
    console.log(e)
  }
}


const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe)

}
init()