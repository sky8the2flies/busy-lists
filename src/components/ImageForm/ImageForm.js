import React from 'react';

const ImageForm = (props) => {
    return (
        <>
            {props.images.map((image, index) => (
                <img
                    key={index}
                    onClick={() => props.handleImageChange(image)}
                    className="clickable"
                    src={image.urls.small}
                />
            ))}
        </>
    );
};

export default ImageForm;
