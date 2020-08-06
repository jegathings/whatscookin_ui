import React, { Fragment } from 'react';
const config = require('../config.json');

export default function Home(props) {
  const [recipes, setRecipes] = React.useState(null);

  const getInfo = async () => {
    console.log("%cstart Home getInfo", "color: red");
    console.log("%cIs authenticated", "color: red", props.auth.isAuthenticated);
    const cognito_id = props.auth.user.attributes.sub;
    console.log("%ccognito id", "color: red", cognito_id);
    console.log("%cEncode Url", "color: red", encodeURI(`${config.api.invokeUrl}${config.users}/${cognito_id}`));
    await fetch(encodeURI(`${config.api.invokeUrl}${config.users}/${cognito_id}`))
      .then(response => response.json())
      .then(recipes => {
        console.log("%cRecipe", "color: red", recipes);
        setRecipes(recipes);
      })
      .catch((error) => {
        console.log("%cHome Error", "color: red");
        console.log(error);
      });
    console.log("%cend Home getInfo", "color: red");
  }

  React.useEffect(() => {
    console.log("%cUse Effect", "color: green");
    console.log("%cUser", "color: green", props.auth.user);
    console.log("%cProps", "color: green", props);
    console.log("%cAuthenticated", "color:green", props.auth.isAuthenticated);
    if (props.auth.isAuthenticated && props.auth.user && props.auth.user.attributes)
      getInfo()
  }, [props.auth.isAuthenticated]);

  const handleDelete = async (recipe) => {
    console.log("%cStart handleDelete", "color: blue");
    console.log("%cRecipe", "color: blue", recipe);
    const cognito_id = recipe.user_id;
    const URL = `${config.api.invokeUrl}${config.app}/${cognito_id}/${recipe.recipe_id}`;
    console.log("%cURL", "color: blue", URL);
    await fetch(`${config.api.invokeUrl}${config.app}/${cognito_id}/${recipe.recipe_id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      }
    )
    console.log("%cEnd handleDelete", "color: blue");
    props.history.push("/");
    props.history.go();
  }

  return (
    <Fragment>
      <div className="recipe_panel">
        {
          recipes ?
            recipes.map((recipe) => {
              return (
                <div key={recipe.recipe_id} className="recipe_card">
                  <div className="recipe_card_title">
                    <h1><a href={recipe.url} target="_blank">{recipe.name}</a></h1>
                  </div>
                  <img src={recipe.image} className="recipe_card_img" />
                  <div className="recipe_card_buttons">
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
                    >Delete</button>
                  </div>
                </div>
              )
            })
            : ""
        }
      </div>
    </Fragment >
  )
}
