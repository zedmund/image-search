import React from 'react';

const Image = ({ url, alt }: { url: string, alt: string }) => (
    <div className="search-image__item">
        <img className="image" src={url} alt={alt} />
    </div> 
);

export default Image;