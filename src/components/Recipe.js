import React from 'react';
const config = require('../config.json');

export default (props) => {
    const [formData, setFormData] = React.useState(props.formData);

    React.useEffect(() =>{
        setFormData(props.formData);
    }, [props.formData]);
    const handleChange = (event) =>{
        setFormData({ ...formData, [event.target.name]: event.target.value})
    }

    const handleCreate = async (data) => {
        await fetch(`${config.api.invokeUrl}${config.app}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({...data,email:props.auth.user.attributes.email}),
        }).then(response => console.log(response))
        .catch((error) => console.log(error));
    }

    return (
        <>        
        <h3>{formData.formTitle}</h3>
            <div className="show_column">
                <div className="show_recipe">
                    <label htmlFor="name">Name</label><br/>
                    <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    /><br/>
                    <label htmlFor="description">Description</label><br/>
                    <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    /><br/>
                    <label htmlFor="ingredients">Ingredients</label><br/>
                    <textarea
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    /><br/>
                    <label htmlFor="directions">Directions</label><br/>
                    <textarea
                    name="directions"
                    value={formData.directions}
                    onChange={handleChange}
                    /><br/>
                    <label htmlFor="images">Image</label><br/>
                    <input
                    type="text"
                    name="img"
                    value={formData.img}
                    onChange={handleChange}
                    /><br/>
                    <label htmlFor="url">URL</label><br/>
                    <input
                    type="text"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    /><br/>
                    <button
                        onClick={() =>{
                            console.log("Clicked Submit");
                            handleCreate(formData);
                        }}
                        >&#10004;</button>
                </div>
            </div>
        </>
    );
};
