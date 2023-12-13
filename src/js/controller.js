import "core-js/stable"
import "regenerator-runtime/runtime"
import * as model from "./model"
import recipeView from "./views/recipeView";

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
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
    alert(e)
  }
};

    ['load', 'hashchange'].forEach(evt => window.addEventListener(evt, controlRecipes))

