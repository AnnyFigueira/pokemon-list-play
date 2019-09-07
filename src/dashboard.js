import {server, Page, React, ObjectID} from 'nullstack';

export default class Dashboard extends Page {
  
  state = {
    lastNumber: 0,
    pokemonList: [],
  }

  @server
  historyDidUpdate() {
    this.set({title: 'Pokémon'});
  }

  @server
  async generateRandomPokemonNumber() {
    let number = (Math.random() * (809-1) + 1).toFixed(0);
    let newList = this.state.pokemonList;
    newList.push(number);
    this.setState({pokemonList: newList});
    this.setState({lastNumber: number})
  }

  async getPokemonName(pokemonNumber)
  {
    try{
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}`);
      return response.name
    } catch(e) {
      console.log(e);
      return null
    }
  }

  async renderPokemonCardList() {
    return(
      <>
      {this.state.pokemonList.map(pokemonNumber => {return this.renderPokemonCard(pokemonNumber)})}
      </>)
  }

  renderPokemonCard(pokemonNumber)
  {
    const formattedNumber = pokemonNumber < 100 ? 0+pokemonNumber : pokemonNumber;
    return(
      <div className="col-2 mb-4">
        <div className="card">
          <img src={`https://www.serebii.net/sunmoon/pokemon/${formattedNumber}.png`} className="card-img-top" alt="..."></img>
          <div className="card-body text-center">
            {/* <span>
              {this.getPokemonName(pokemonNumber)}
            </span> */}
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <>
        <div className="container">
          <h1> Hello! </h1>
          
          <button className="btn my-2 mx-2" onClick={() => this.generateRandomPokemonNumber()}>
            <i className="fas fa-redo-alt"></i>
          </button>

          <button className="btn my-2 mx-2">
            <i className="far fa-save"></i>
          </button>

          <p>Último Pokémon Gerado: {this.state.lastNumber} </p>
          <div className="row">

            {this.renderPokemonCardList()}

          </div>
        </div>
      </>
    )
  }

}
