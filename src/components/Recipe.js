import React, { Fragment } from 'react';
const config = require('../config.json');

export default (props) => {
    const [formData, setFormData] = React.useState(props.formData);

    React.useEffect(() => {
        setFormData(props.formData);
    }, [props.formData]);
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleCreate = async (data) => {
        const recipe = { ...data, cognito_id: props.auth.user.attributes.sub };
        console.log("Create recipe", recipe);
        await fetch(`${config.api.invokeUrl}${config.app}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(recipe)
        })
            .then(response => console.log(response))
            .catch((error) => console.log(error));
        props.history.push("/");
    }

    return (
        <Fragment>
            <h3>{formData.formTitle}</h3>
            <div>
                <div className="panel_c">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="create_input"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="panel_c">
                    <label htmlFor="description">Description</label><br />
                    <input
                        type="text"
                        name="description"
                        className="create_input"
                        value={formData.description}
                        onChange={handleChange}
                    /><br />
                </div>
                <div className="panel_c">
                    <label htmlFor="ingredients">Ingredients</label><br />
                    <textarea
                        name="ingredients"
                        className="create_textarea"
                        value={formData.ingredients}
                        onChange={handleChange}
                    /><br />
                </div>
                <div className="panel_c">
                    <label htmlFor="directions">Directions</label><br />
                    <textarea
                        name="directions"
                        className="create_textarea"
                        value={formData.directions}
                        onChange={handleChange}
                    /><br />
                </div>
                <div className="panel_c">
                    <label htmlFor="images">Image</label><br />
                    <input
                        type="text"
                        name="image"
                        className="create_input"
                        value={formData.image}
                        onChange={handleChange}
                    /><br />
                </div>
                <div className="panel_c">
                    <label htmlFor="url">URL</label><br />
                    <input
                        type="text"
                        name="url"
                        className="create_input"
                        value={formData.url}
                        onChange={handleChange}
                    /><br />
                </div>
                <div className="panel_c">
                    <button
                        onClick={() => {
                            console.log("Clicked Submit");
                            handleCreate(formData);
                        }}
                    >Submit</button>
                </div>
            </div>
        </Fragment>
    );
};
