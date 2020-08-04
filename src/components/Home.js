import React, { Fragment } from 'react';
const config = require('../config.json');

export default function Home(props) {
  const [recipes, setRecipes] = React.useState(null);

  const getInfo = async () => {
    console.log("start getInfo");
    console.log("Url",`${config.api.invokeUrl}${config.app}`);
    const response = await fetch(`${config.api.invokeUrl}${config.app}`)
    .catch((error) => console.log(error))
    const recipes = await response.json();
    console.log("Recipes", recipes);
    setRecipes(recipes);
    console.log("end getInfo");
  }

  React.useEffect(() => {
    getInfo()
  }, []);

  return (
    <Fragment>
      <div className="container">
        {
          recipes ?
            recipes.map((recipe) => {
              return (
                <div key={recipe.recipe_id}>
                  <a href="#">{recipe.name}</a>  
                </div>
              )
            })
            :"...loading"
        }
      </div>
    </Fragment>
  )
}
