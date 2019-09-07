import {server, Page, React, ObjectID} from 'nullstack';

export default class Dashboard extends Page {

  state = {
    pokemons: []
  }

  @server
  historyDidUpdate() {
    this.set({title: 'Pokémon'});
  }

  @server
  async generateRandomPokemon() {
    const number = (Math.random() * (809-1) + 1).toFixed(0);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${number}`);
    const data = await response.json();
    this.setState({
      pokemons: [...this.state.pokemons, {number, name: data.name}]
    });
  }

  renderPokemonCard(pokemon) {
    const formattedNumber = pokemon.number < 100 ? 0 + pokemon.number : pokemon.number;
    return (
      <div className="col-2 mb-4" key={pokemon.number}>
        <div className="card">
          <img src={`https://www.serebii.net/sunmoon/pokemon/${formattedNumber}.png`} className="card-img-top" alt={pokemon.name} />
          <div className="card-body text-center"> {pokemon.name} #{pokemon.number} </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <>
        <div className="container">
          <h1> Hello! </h1>
          <button className="btn my-2 mx-2" onClick={() => this.generateRandomPokemon()}>
            <i className={`fas ${this.state.loading.generateRandomPokemon ? 'fa-spinner fa-pulse' : 'fa-redo-alt'}`}></i>
          </button>
          <button className="btn my-2 mx-2">
            <i className="far fa-save"></i>
          </button>
          {this.state.pokemons.length > 0 &&
            <p> Último Pokémon Gerado: {this.state.pokemons[this.state.pokemons.length - 1].number} </p>
          }
          <div className="row">
            {this.state.pokemons.map(pokemon => this.renderPokemonCard(pokemon))}
          </div>
        </div>
      </>
    )
  }

}
