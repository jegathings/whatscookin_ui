import React, { Fragment } from 'react';
import { useParams, useHistory } from "react-router-dom";
const config = require('../config.json');

export default (props) => {
    const [formData, setFormData] = React.useState(props.formData);
    const [recipe, setRecipe] = React.useState(null);
    const [url, setUrl] = React.useState('');
    const { recipe_id } = useParams();

    const getInfo = async () => {
        console.log("start EditRecipe getInfo");
        console.log("recipe_id",recipe_id);
        const cognito_id = props.auth.user.attributes.sub
        const URL = `${config.api.invokeUrl}${config.app}/${cognito_id}/${recipe_id}`;
        console.log("Url", URL);
        await fetch(`${config.api.invokeUrl}${config.app}/${cognito_id}/${recipe_id}`)
        .then( response => response.json())
        .then( recipe =>{
            console.log("Recipe", recipe);
            setRecipe(recipe);  
            setUrl(URL);       
        })
        .catch((error) => console.log(error))   
        console.log("end EditRecipe getInfo");
    }

    React.useEffect(() => {
        getInfo()
    }, [recipe_id]);

    const handleChange = (event) => {
        setRecipe({ ...recipe, [event.target.name]: event.target.value })
    }

    const handleUpdate = async (data) => {
        console.log("start handle update");
        const input = { ...data, cognito_id: props.auth.user.attributes.cognito_id }
        console.log("Input", input);
        console.log("URL", url);
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(input)
        })
            .then(response => console.log(response))
            .catch((error) => console.log(error));
        props.history.push("/");
        console.log("end handle update");
    }

    return (
        <>
            {
                recipe &&
                <Fragment>
                    <h3>{formData.formTitle}</h3>
                    <h4><a href="/">Home</a></h4>
                    <div className="container">
                        <div className="panel_c">
                            <label htmlFor="name">Name</label><br />
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="create_input"
                                value={recipe.name}
                                onChange={handleChange}
                            /><br />
                        </div>
                        <div className="panel_c">
                            <label htmlFor="description">Description</label><br />
                            <input
                                type="text"
                                name="description"
                                className="create_input"
                                value={recipe.description}
                                onChange={handleChange}
                            /><br />
                        </div>
                        <div className="panel_c">
                            <label htmlFor="ingredients">Ingredients</label><br />
                            <textarea
                                name="ingredients"
                                className="create_input"
                                value={recipe.ingredients}
                                onChange={handleChange}
                            /><br />
                        </div>
                        <div className="panel_c">
                            <label htmlFor="directions">Directions</label><br />
                            <textarea
                                name="directions"
                                value={recipe.directions}
                                className="create_input"
                                onChange={handleChange}
                            /><br />
                        </div>
                        <div className="panel_c">
                            <label htmlFor="images">Image</label><br />
                            <input
                                type="text"
                                name="image"
                                className="create_input"
                                value={recipe.image}
                                onChange={handleChange}
                            /><br />
                        </div>
                        <div className="panel_c">
                            <label htmlFor="url">URL</label><br />
                            <input
                                type="text"
                                name="url"
                                className="create_input"
                                value={recipe.url}
                                onChange={handleChange}
                            /><br />
                        </div>
                        <div className="panel_c">
                            <button
                                onClick={() => {
                                    console.log("Clicked Submit");
                                    handleUpdate(recipe);
                                }}
                            >Submit</button>
                        </div>
                    </div>
                </Fragment>
            }
        </>
    );
};