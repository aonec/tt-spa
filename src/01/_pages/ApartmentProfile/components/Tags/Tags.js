import React, {useState} from 'react'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.
import './style.css';
import {Title} from '../Title';

export function Tags() {

  const [tags, setTags] = useState(['Бабулька', 'Шустрая'])
  const handleChange = (tags) => {
    setTags(tags)
  }
  return (<>
    <Title size="24">Теги</Title>
    <TagsInput value={tags} onChange={handleChange}/>
  </>)

}