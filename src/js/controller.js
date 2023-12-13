import "core-js/stable"
import "regenerator-runtime/runtime"
import * as model from "./model"
import recipeView from "./views/recipeView"
import searchView from "./views/searchView"

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1)

    if (!id) return
    recipeView.renderSpinner()

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
    //get search query
    const query = searchView.getQuery()
    if (!query) return

    await model.loadSearchResults(query)

  } catch (e) {

  }
}

const init = function () {
  recipeView.addHandlerRender(controlRecipes)
  searchView.addHandlerSearch(controlSearchResults)
}
init()