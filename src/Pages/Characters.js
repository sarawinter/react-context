import React, { Component } from 'react';
import { getCharacters, typeConstants } from '../Data/data';
import { LayoutContext, layout } from '../Contexts/layout';
import './_page.css';

import Menu from '../Components/Global/Menu';
import Character from '../Components/CharacterTypes/Character';

class Characters extends Component {

    constructor(props) {
        super(props);

        this.state = {
            charactersData: this.getCharactersData(),
            currentCharacter: {},
            currentId: this.getCharacterId()
        }
    }

    componentDidMount() {
        const id = this.state.currentId;
        this.setCharacter(id);
    }

    componentDidUpdate() {
        const id = this.getCharacterId();

        if (id !== this.state.currentId) {
            this.setCharacter(id);
        }
    }

    setCharacter = (id) => {
        const character = this.getCharacterById(id);
        this.setState({
            currentId: id,
            currentCharacter: character
        });
    }

    getCharactersData = () => {
        return getCharacters();
    }

    getCharacterId = () => {
        return this.props.match.params && this.props.match.params.id;
    }

    getCharacterById = (id) => {
        return this.state.charactersData.find(char => char.id === parseInt(id));
    }

    render() {

        const charType = this.state.currentCharacter && this.state.currentCharacter.type;
        const { currentCharacter, charactersData } = this.state;
        let char = null;
        let charLayout = null;

        switch (charType) {
            case typeConstants.HERO:
                charLayout = layout.hero;
                char = <Character {...this.props} id={currentCharacter.id} character={currentCharacter} characterList={charactersData} />
                break;
            case typeConstants.VILLAIN:
                charLayout = layout.villain;
                char = <Character {...this.props} id={currentCharacter.id} character={currentCharacter} characterList={charactersData} />
                break;
            case typeConstants.SIDEKICK:
                charLayout = layout.sidekick;
                char = <Character {...this.props} id={currentCharacter.id} character={currentCharacter} characterList={charactersData} />
                break;
            default:
                charLayout = layout.sidekick;
                char = null;
        }

        return (
            <div className="page">
                <div className="left-col"><Menu characters={charactersData} /></div>
                <div className="right-col">
                    <LayoutContext.Provider value={charLayout}>
                        {this.state.currentId ? char : 'Hello characters...'}
                    </LayoutContext.Provider>
                </div>
            </div>
        );
    }
}

export default Characters;
