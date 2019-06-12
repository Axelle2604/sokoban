import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { levelOne, levelTest } from '../data/levels';
import CaseElement from './CaseElement';
import Controllers from './Controllers';

const setNewPlayerPosition = newPosition => ({ playerPosition }) => {
  const nextPosition = {
    posX: playerPosition.posX + newPosition.posX,
    posY: playerPosition.posY + newPosition.posY,
  };
  return { playerPosition: nextPosition };
};

const setNewBoxesPositions = (newPosition, box) => ({
  boxesPositions,
  playerPosition,
}) => {
  const boxIndex = boxesPositions.indexOf(box);

  return {
    boxesPositions: [
      ...boxesPositions.slice(0, boxIndex),
      {
        posX: box.posX + newPosition.posX,
        posY: box.posY + newPosition.posY,
      },
      ...boxesPositions.slice(boxIndex + 1),
    ],
  };
};

const addBoxToBoxesPositionsList = position => ({ boxesPositions }) => {
  return {
    boxesPositions: [
      ...boxesPositions,
      { posX: position.posX, posY: position.posY },
    ],
  };
};

const fillMapPositions = (elem, posX, posY) => ({ mapPositions }) => ({
  mapPositions: [...mapPositions, { elem, posX, posY }],
});

export default class GameContainer extends Component {
  state = {
    level: levelTest,
    mapPositions: [],
    playerPosition: { posX: 0, posY: 0 },
    boxesPositions: [],
  };

  componentDidMount = () => {};

  setPlayerPosition = newPosition => {
    const { mapPositions, playerPosition, boxesPositions } = this.state;

    const isWall = mapPositions.find(
      elem =>
        elem.elem === 'X' &&
        elem.posX === playerPosition.posX + newPosition.posX &&
        elem.posY === playerPosition.posY + newPosition.posY
    );

    const isBox = boxesPositions.find(
      elem =>
        elem.posX === playerPosition.posX + newPosition.posX &&
        elem.posY === playerPosition.posY + newPosition.posY
    );

    const isNotPushable =
      !!isBox &&
      (!!mapPositions.find(
        elem =>
          elem.elem === 'X' &&
          elem.posX === playerPosition.posX + newPosition.posX * 2 &&
          elem.posY === playerPosition.posY + newPosition.posY * 2
      ) ||
        !!boxesPositions.find(
          elem =>
            elem.posX === playerPosition.posX + newPosition.posX * 2 &&
            elem.posY === playerPosition.posY + newPosition.posY * 2
        ));

    if (isWall) {
      return null;
    }

    if (isNotPushable) {
      return null;
    }

    if (isBox) {
      this.setBoxesPositions(newPosition, isBox);
    }

    this.setState(setNewPlayerPosition(newPosition), () => {
      if (this.checkWinConditions()) {
        console.log('gagné !');
      }
    });
  };

  checkWinConditions = () => {
    const { mapPositions, boxesPositions } = this.state;
    const targetsPositions = mapPositions.filter(target => target.elem === '.');
    const isBoxesOnTargets = targetsPositions.map(target => {
      return boxesPositions.map(box => {
        if (target.posX === box.posX && target.posY === box.posY) {
          return true;
        }
        return false;
      });
    });
    const tabBoxesOnTargets = isBoxesOnTargets.map(tab =>
      tab.find(bool => bool)
    );

    return tabBoxesOnTargets.every(this.checkAllBoxesAreOnTarget);
  };

  checkAllBoxesAreOnTarget = isOnTarget => {
    return isOnTarget;
  };

  setBoxesPositions = (newPosition, box) => {
    const { boxesPositions } = this.state;
    if (boxesPositions.length > 0) {
      this.setState(setNewBoxesPositions(newPosition, box));
    } else {
      this.setState(addBoxToBoxesPositionsList(newPosition));
    }
  };

  setMapPositions = (elem, posX, posY) => {
    this.setState(fillMapPositions(elem, posX, posY));
  };

  render() {
    const { level, playerPosition, boxesPositions } = this.state;
    const rows = level.mapLevel.split('\n');
    return (
      <View>
        <Text>{level.name}</Text>
        <Game>
          {rows.map((gameRow, posY) => (
            <GameRow key={posY}>
              {gameRow.split('').map((elem, posX) => {
                return (
                  <CaseElement
                    key={posX}
                    elem={elem}
                    posX={posX}
                    posY={posY}
                    playerPosition={playerPosition}
                    boxesPositions={boxesPositions}
                    setPlayerPosition={this.setPlayerPosition}
                    setMapPositions={this.setMapPositions}
                    setBoxesPositions={this.setBoxesPositions}
                  />
                );
              })}
            </GameRow>
          ))}
        </Game>
        <Controllers setPlayerPosition={this.setPlayerPosition} />
      </View>
    );
  }
}

const Game = styled(View)``;

const GameRow = styled(View)`
  flex-direction: row;
`;
