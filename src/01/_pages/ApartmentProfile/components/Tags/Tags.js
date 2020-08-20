import React, { useState } from 'react'
import TagsInput from 'react-tagsinput'

import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.

import './style.css';

export function Tags() {

    const [tags, setTags] = useState(['Бабулька', 'Шустрая'])
    const a = tags;
    const handleChange = (tags) => {
        console.log(tags);
        setTags(tags)
    }
    return <TagsInput placeholder="sdfs" value={tags} onChange={handleChange}
    />

}