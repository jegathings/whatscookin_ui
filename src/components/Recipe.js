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
        await fetch(`${config.api.invokeUrl}${config.app}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ ...data, email: props.auth.user.attributes.email })
        })
            .then(response => console.log(response))
            .catch((error) => console.log(error));
        props.history.push("/");
    }

    return (
        <Fragment>
            <h3>{formData.formTitle}</h3>
            <div className="container">
                <div className="panel_row">
                    <label htmlFor="name">Name</label><br />
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                    /><br />
                </div>
                <div className="panel_row">
                    <label htmlFor="description">Description</label><br />
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    /><br />
                </div>
                <div className="panel_row">
                    <label htmlFor="ingredients">Ingredients</label><br />
                    <textarea
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                    /><br />
                </div>
                <div className="panel_row">
                    <label htmlFor="directions">Directions</label><br />
                    <textarea
                        name="directions"
                        value={formData.directions}
                        onChange={handleChange}
                    /><br />
                </div>
                <div className="panel_row">
                    <label htmlFor="images">Image</label><br />
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                    /><br />
                </div>
                <div className="panel_row">
                    <label htmlFor="url">URL</label><br />
                    <input
                        type="text"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                    /><br />
                </div>
                <div className="panel_row">
                    <button
                        onClick={() => {
                            console.log("Clicked Submit");
                            handleCreate(formData);
                        }}
                    >&#10004;</button>
                </div>
            </div>
        </Fragment>
    );
};
