import React, { Component } from 'react';

class Characters extends Component {
  constructor(){
    super();
    this.state = {
      characters: [],
      search: ''
    };
    this.search = this.search.bind(this);
  }
  componentDidMount(){
   fetch('http://localhost:5000')
   .then(res => res.json())
   .then(characters => this.setState({characters}, () => console.log('Customers Fetched')));
  }

// search box event
  search(e) {

    this.setState({
      search: e.target.value.toLowerCase()
    });
  }

  render() {
    const { characters } = this.state;
    console.log(characters, this.state);
    return (
      <div >
      <div className="search-input">
        <input type="text" placeholder="Search Characters" onChange={this.search} />
      </div>
        {
        // map through the characters
          characters
          .filter(character => character.name.toLowerCase().includes(this.state.search))
          .map((character, index) => (
            <div className="cards" key={index}>
              <h2 className="charName">{character.name}</h2>
              <img className="thumbnail" src={character.thumbnail.path + '.' + character.thumbnail.extension} />
            </div>
          ))
        }
      </div>
    );
  }
}

export default Characters;
