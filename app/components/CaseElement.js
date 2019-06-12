import React, { PureComponent } from 'react';
import { View, Text, Dimensions } from 'react-native';
import styled from 'styled-components';
import { levelOne } from '../data/levels';

const { width: boxSize } = Dimensions.get('window');

export default class CaseElement extends PureComponent {
  state = {
    isPlayer: false,
    isBox: false,
  };

  componentDidMount = () => {
    const {
      elem,
      posX,
      posY,
      setPlayerPosition,
      setMapPositions,
      setBoxesPositions,
    } = this.props;

    setMapPositions(elem, posX, posY);

    if (elem === '@') {
      this.setState({ isPlayer: true });
      setPlayerPosition({ posX, posY });
    }
    if (elem === '*') {
      this.setState({ isBox: true });
      setBoxesPositions({ posX, posY });
    }
  };

  componentDidUpdate = () => {
    const { playerPosition, posX, posY, boxesPositions } = this.props;
    if (playerPosition.posX === posX && playerPosition.posY === posY) {
      this.setState({ isPlayer: true });
    } else {
      this.setState({ isPlayer: false });
    }
    if (boxesPositions.find(box => box.posX === posX && box.posY === posY)) {
      this.setState({ isBox: true });
    } else {
      this.setState({ isBox: false });
    }
  };

  render() {
    const { isPlayer, isBox } = this.state;
    const { elem, posX, posY, playerPosition } = this.props;
    return (
      <Case
        elem={elem}
        isPlayer={isPlayer}
        isBox={isBox}
        size={boxSize / levelOne.x}
      />
    );
  }
}

const isWall = elem => elem === 'X' && 'black';
const isGround = elem => elem === ' ' && 'grey';
const isThePlayer = isPlayer => isPlayer && 'red';
const isTheBox = isBox => isBox && 'blue';
const isTarget = elem => elem === '.' && 'green';

const Case = styled(View)`
  background-color: ${({ elem, isPlayer, isBox }) =>
    isThePlayer(isPlayer) ||
    isTheBox(isBox) ||
    isWall(elem) ||
    isGround(elem) ||
    isTarget(elem) ||
    'grey'};
  border: solid 1px white;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;
