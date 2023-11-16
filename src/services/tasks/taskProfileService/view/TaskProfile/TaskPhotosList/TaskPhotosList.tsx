import React, { FC } from 'react';
import { Image } from 'antd';
import { ImageWrapper, Images, Title, Wrapper } from './TaskPhotosList.styled';
import { TaskPhotosListProps } from './TaskPhotosList.types';

export const TaskPhotosList: FC<TaskPhotosListProps> = ({ photos }) => {
  const numberOfPhotos = photos.length;

  if (!numberOfPhotos) return null;

  return (
    <Wrapper>
      <Title>Фотографии ({numberOfPhotos})</Title>

      <Images>
        {photos.map((photo) => (
          <ImageWrapper>
            <Image height={100} src={photo.url!} title={photo.name!} />
          </ImageWrapper>
        ))}
      </Images>
    </Wrapper>
  );
};
