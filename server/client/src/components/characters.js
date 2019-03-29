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
      <div>
        <input type="text" placeholder="Search" onChange={this.search} />
        {
        // map through the characters
          characters
          .filter(character => character.name.toLowerCase().includes(this.state.search))
          .map((character, index) => (
            <div key={index}>
              <h2>{character.name}</h2>
              <img width="100" src={character.thumbnail.path + '.' + character.thumbnail.extension} />
            </div>
          ))
        }
      </div>
    );
  }
}

export default Characters;
