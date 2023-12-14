import "core-js/stable"
import "regenerator-runtime/runtime"
import * as model from "./model"
import recipeView from "./views/recipeView"
import searchView from "./views/searchView"
import resultsView from "./views/resultsView"
import paginationView from "./views/paginationView";

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

const init = function () {
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)

}
init()