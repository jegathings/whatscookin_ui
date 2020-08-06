import React, { Fragment } from 'react';
import { useParams, useHistory } from "react-router-dom";
const config = require('../config.json');

export default function ViewRecipe(props) {
    const [formData, setFormData] = React.useState(props.formData);
    const [recipe, setRecipe] = React.useState(null);
    const [url, setUrl] = React.useState('');
    const { recipe_id } = useParams();

    const getInfo = async () => {
        console.log("start View getInfo");
        console.log("recipe_id", recipe_id);
        const cognito_id = props.auth.user.attributes.sub
        const URL = `${config.api.invokeUrl}${config.app}/${cognito_id}/${recipe_id}`;
        console.log("Url", URL);
        const response = await fetch(URL)
            .catch((error) => console.log(error))
        const recipe = await response.json();
        console.log("Recipe", recipe);
        setRecipe(recipe);
        setUrl(URL);
        console.log("end View getInfo");
    }

    React.useEffect(() => {
        getInfo()
    }, [recipe_id]);

    return (
        <>
        {
            recipe &&
            <Fragment>
                <h1><a href="/">Home</a></h1>
                <div className="view_container">
                    <div className="panel_c">
                        <div><a href={recipe.url}><h1>{recipe.name}</h1></a></div>
                    </div>
                    <div className="panel_c">
                        <img src={recipe.image} alt={recipe.name} />
                    </div>
                    <div className="panel_c">
                        <div><h1>Description</h1></div>
                        <div>{recipe.description}</div>
                    </div>
                    <div className="panel_c">
                        <div><h1>Ingredients</h1></div>
                        <div>{recipe.ingredients}</div>
                    </div>
                    <div className="panel_c">
                        <div><h1>Directions</h1></div>
                        <div>{recipe.directions}</div>
                    </div>
                </div>
            </Fragment>
        }
        </>
    )
}