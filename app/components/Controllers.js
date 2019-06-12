import React from 'react';
import { View, Text, Button, Dimensions } from 'react-native';
import styled from 'styled-components';

const Controllers = ({ setPlayerPosition }) => {
  const onPressController = (direction, arrow) => {
    setPlayerPosition(direction);
  };

  const { width } = Dimensions.get('window');

  return (
    <ButtonsContainer>
      <Button
        title="Left"
        onPress={onPressController.bind(this, { posX: -1, posY: 0 })}
        width={width}
      />
      <Button
        title="Up"
        onPress={onPressController.bind(this, { posX: 0, posY: -1 })}
      />
      <Button
        title="Right"
        onPress={onPressController.bind(this, { posX: 1, posY: 0 })}
      />
      <Button
        title="Down"
        onPress={onPressController.bind(this, { posX: 0, posY: 1 })}
      />
    </ButtonsContainer>
  );
};

const ButtonsContainer = styled(View)`
  position: relative;
  border: solid 1px black;
`;

export default Controllers;
