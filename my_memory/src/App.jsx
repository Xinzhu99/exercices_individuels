import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
//shuffle() permet de rendre mon array random
//map(item) =>  ttribuer une valeur SetValue random pour chaque card 
//onClick : appel fonction shuffle et verifie si carte est cachée ou pas: sioui => afficher setvalue => sinon 
function App() {
  let cards = [
    {id:1, emoji:"🎃", showValue:false},
    {id:2, emoji:"🎃", showValue:false},
    {id:3, emoji:"👻", showValue:false},
    {id:4, emoji:"👻", showValue:false},
    {id:5, emoji:"🍬", showValue:false},
    {id:6, emoji:"🍬", showValue:false},
    {id:7, emoji:"🧙", showValue:false},
    {id:8, emoji:"🧙", showValue:false}
  ]
  //fonction qui permet de créer un nouvel array random
  function shuffle(cards) {
     for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    // console.log(cards)
    return(cards)
  }
  let shuffledCards = shuffle(cards)
  //déclarer mes states
  const [myCards, setMyCards] = useState(shuffledCards)
  const [count, setCount] = useState(0)
  const [pair, setPair] = useState([])
  //fonction qui permet de communiquer le id de la carte cliquée via param et de modifier le bool
  //showCard dans mon array en créeant une nouvelle copie 
  
  function handleClick(id,showValue){
    let newCards = []

    //si la carte a déjà été tournée, le compteur ne s'accualise pas 
    if (!showValue) {
      setCount(count+1)
      setPair(pair.push(id))
    }
    console.log(pair)

    for (let i = 0; i < myCards.length; i++) {
      let card = myCards[i]
      if (card.id === id) {
        newCards.push({...card, showValue: true})
      } else {
        newCards.push(card)
      }
    }
    setMyCards(newCards)

  }

  return (
    <div className="display">
      <div className="counter">
        <p>{count}</p>
      </div>
      {myCards.map((item)=> <div onClick={()=>handleClick(item.id, item.showValue)} className="card" key={item.id}>{item.showValue ? item.emoji : "X"}
      </div>)}


    </div>
  );
}

export default App;
