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
        const email = props.auth.user.attributes.email
        const URL = `${config.api.invokeUrl}${config.app}/${email}/${recipe_id}`;
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
                <div className="container">
                    <h4><a href="/">Home</a></h4>
                    <div className="panel_col">
                        <div><h1>Recipe Name</h1></div>
                        <div><a href={recipe.url}>{recipe.name}</a></div>
                    </div>
                    <div className="panel_col">
                        <img src={recipe.image} alt={recipe.name} />
                    </div>
                    <div className="panel_col">
                        <div><h1>Description</h1></div>
                        <div>{recipe.description}</div>
                    </div>
                    <div className="panel_col">
                        <div><h1>Ingredients</h1></div>
                        <div>{recipe.ingredients}</div>
                    </div>
                    <div className="panel_col">
                        <div><h1>Directions</h1></div>
                        <div>{recipe.directions}</div>
                    </div>
                </div>
            </Fragment>
        }
        </>
    )
}


// const getInfo = async () => {
//     console.log("start view recipe getInfo");
//     console.log("recipe_id", recipe_id);
//     const email = props.auth.user.attributes.email
//     const URL = `${config.api.invokeUrl}${config.app}/${email}/${recipe_id}`;
//     console.log("Url", URL);
//     const response = await fetch(`${config.api.invokeUrl}${config.app}`)
//         .catch((error) => console.log(error))
//     const recipe = await response.json();
//     console.log("Recipe", recipe[0]);
//     console.log("Name", { ...recipe[0] });
//     setRecipe({ ...recipe[0] });
//     console.log("end view recipe getInfo");
// }

// React.useEffect(() => {
//     getInfo()
// }, [recipe_id]);

// return (
//     <Fragment>
//         <div className="container">
//             <h4><a href="/">Home</a></h4>
//             <div className="panel_col">
//                 <div>Recipe Name</div>
//                 <div><a href={recipe.url}>{recipe.name}</a></div>
//             </div>
//             <div className="panel_col">
//                 <img src={recipe.image} alt={recipe.name} />
//             </div>
//             <div className="panel_col">
//                 <div>{recipe.description}</div>
//             </div>
//             <div className="panel_col">
//                 <div>Ingredients</div>
//                 <div>{recipe.ingredients}</div>
//             </div>
//             <div className="panel_col">
//                 <div>Directions</div>
//                 <div>{recipe.directions}</div>
//             </div>
//         </div>
//     </Fragment>
// )
