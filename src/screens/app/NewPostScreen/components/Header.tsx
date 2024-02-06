import React from 'react';
import {ImageBackground} from 'react-native';

import {images} from '@assets';
import {useNavigation} from '@react-navigation/native';

import {Box, BoxProps, Button, Icon, Text} from '@components';

interface Props {
  imageUri?: string;
  imageWidth: number;
}

export function Header({imageWidth, imageUri}: Props) {
  const navigation = useNavigation();

  function navigateToPublishPost() {
    if (imageUri) {
      navigation.navigate('PublishPostScreen', {imageUri});
    }
  }

  function navigateToCamera() {
    navigation.navigate('CameraScreen');
  }

  return (
    <Box>
      <ImageBackground
        source={imageUri ? {uri: imageUri} : images.imagePlaceholder}
        style={{
          width: imageWidth,
          height: imageWidth,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        {!!imageUri && (
          <Button
            onPress={navigateToPublishPost}
            preset="ghost"
            title="Escolher essa"
            mb="s24"
          />
        )}
      </ImageBackground>
      <Box {...$optionsStyle}>
        <Text preset="headingSmall">Sua galeria</Text>
        <Icon name="camera" onPress={navigateToCamera} />
      </Box>
    </Box>
  );
}

const $optionsStyle: BoxProps = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 's24',
  paddingVertical: 's20',
};
