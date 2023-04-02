import React from 'react'
import Badge from '@mui/material/Badge';
import './SingleContent.css'
import { img_300, unavailable } from '../../config/config'
import ContentModal from '../ContentModel/ContentModel';

const SingleContent = ({ id, poster, title, date, media, vote }) => {
  return (
    <ContentModal id={id} media={media}>
      <Badge badgeContent={vote} color={vote > 6 ? 'primary' : 'secondary'} />
      <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
      <b className="title">{title}</b>
      <span className='subTitle'>
        {media === 'tv' ? 'Tv Series' : 'Movie'}
        <span className="subTitle">{date}</span>
      </span>
    </ContentModal>
  )
}

export default SingleContent