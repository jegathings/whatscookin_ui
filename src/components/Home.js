import React, { Fragment } from 'react';
const config = require('../config.json');

export default function Home(props) {
  const [recipes, setRecipes] = React.useState(null);

  const getInfo = async () => {
    console.log("start Home getInfo");
    console.log("Is authenticated", props.auth.isAuthenticated);
    console.log("Url", `${config.api.invokeUrl}${config.app}`);
    const response = await fetch(`${config.api.invokeUrl}${config.app}`)
      .catch((error) => console.log(error))
    const recipes = await response.json();
    console.log("Recipes", recipes);
    setRecipes(recipes);
    console.log("end Home getInfo");
  }

  React.useEffect(() => {
    getInfo()
  }, []);

  const handleDelete = async (recipe) => {
    console.log("Start handleDelete");
    console.log("Recipe", recipe);
    const email= recipe.user_id;
    const URL = `${config.api.invokeUrl}${config.app}/${email}/${recipe.recipe_id}`;
    console.log("URL",URL);
    await fetch(`${config.api.invokeUrl}${config.app}/${email}/${recipe.recipe_id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      }
    )
    console.log("End handleDelete");
    props.history.push("/");
  }

  return (
    <Fragment>
      <div className="container">
        {
          recipes ?
            recipes.map((recipe) => {
              return (
                <div key={recipe.recipe_id}>
                  <div>
                    <div><a href={`/view/${recipe.recipe_id}`}>{recipe.name}</a></div>
                    <div className="panel_row">
                      <div className="button" onClick={() => {
                        console.log("Clicked Edit");
                        props.history.push(`/edit/${recipe.recipe_id}`);
                      }
                      }>Edit</div>
                      <button
                        className="button"
                        onClick={() => {
                          handleDelete(recipe);

                        }}
                      >&#10007;</button>



                    </div>
                  </div>
                </div>
              )
            })
            : "...loading"
        }
      </div>
    </Fragment>
  )
}
