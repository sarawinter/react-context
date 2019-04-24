import React, { Component } from 'react';
import { LayoutContext } from '../../Contexts/layout';
import './_character.css';

import CharacterMini from './CharacterMini';

class Character extends Component {

    constructor(props) {
        super(props);

        this.state = {
            characterData: this.props.character,
            modifiedBiography: null,
            charId: this.props.id
        }
    }

    componentDidMount() {
        this.modifyCharacterBiography();
    }

    componentDidUpdate() {
        if (this.props.id !== this.state.charId) {
            this.modifyCharacterBiography();
        }
    }

    modifyCharacterBiography = () => {
        const currentCharacter = this.props.character;
        let text = currentCharacter.biography;
        let superArray = [];

        let paragraphArray = text.split('\n').map((item, key) => {
            return item;
        });
        paragraphArray.forEach(paragraph => {

            const pArray = paragraph.split(' ');

            const arr = pArray.map((word) => {
                let includesName = false;
                let counter = 0;
                let inserted = [];
                this.props.characterList.forEach(character => {
                    if (character.name !== currentCharacter.name) {
                        includesName = word.includes(character.name);
                        if (includesName) {
                            counter++;
                            inserted = this.insertName(word, character);
                            inserted.push(' ');
                        }
                    }
                });
                return counter > 0 ? inserted : [word, ' '];
            });

            superArray.push(arr.flat())
        });

        const final = superArray.map((item, key) => <div className="paragraph" key={`p_${key}_${currentCharacter.name}`}>{item}</div>);

        this.setState({
            characterData: currentCharacter,
            modifiedBiography: final,
            charId: currentCharacter.id
        });
    }

    insertName = (word, char) => {
        const nameArray = word.split(char.name);
        const retValue = nameArray.reduce((result, element, index, array) => {
            result.push(element);
            if (index < array.length - 1) {
                result.push(<CharacterMini key={`mini_${index}_${char.name}`} character={char} />);
            }
            return result;
        }, []);

        return retValue;
    }

    render() {

        return (
            <LayoutContext.Consumer>
                {({ imageStyle, headerText, headerFont }) => (
                    <div className="character">
                        <h2 style={{ fontFamily: headerFont }}>{this.state.characterData.name} - {headerText}</h2>
                        <img style={imageStyle} src={this.state.characterData.image} alt="" />
                        <div>{this.state.modifiedBiography}</div>
                    </div>
                )}
            </LayoutContext.Consumer>
        );
    }
};

export default Character;

