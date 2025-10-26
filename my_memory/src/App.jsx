import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import React from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

function App() {
  const { width, height } = useWindowSize();
  let cards = [
    { id: 1, emoji: "🎃", showValue: false },
    { id: 2, emoji: "🎃", showValue: false },
    { id: 3, emoji: "👻", showValue: false },
    { id: 4, emoji: "👻", showValue: false },
    { id: 5, emoji: "🍬", showValue: false },
    { id: 6, emoji: "🍬", showValue: false },
    { id: 7, emoji: "🧙", showValue: false },
    { id: 8, emoji: "🧙", showValue: false },
  ];
  //fonction qui permet de créer un nouvel array random
  function shuffle(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    // console.log(cards)
    return cards;
  }
  let shuffledCards = shuffle(cards);
  //déclarer mes states
  const [myCards, setMyCards] = useState(shuffledCards);
  const [count, setCount] = useState(0);
  const [pair, setPair] = useState([]);
  const [isWinner, setIsWinner] = useState(false);
  //fonction qui permet de communiquer le id de la carte cliquée via param et de modifier le bool
  //showCard dans mon array en créeant une nouvelle copie
  function handleClick(id, showValue, emoji) {
    let newCards = [];
    for (let i = 0; i < myCards.length; i++) {
      let card = myCards[i];
      if (card.id === id) {
        newCards.push({ ...card, showValue: true });
        if (!showValue) {
          setCount(count + 1);
          setPair([...pair, { id: id, emoji: emoji }]); //cette syntaxe remplace la méthode.push
        }
      } else {
        newCards.push(card);
      }
    }
    setMyCards(newCards);
  }
  //utiliser useEfeect pour surveiller l'état d'une useState et déclencher les actions
  //je mets à l'intérieur de [] les "dépendences": ce que je veux surveiller
  useEffect(() => {
    if (pair.length === 2 && pair[0].emoji !== pair[1].emoji) {
      setTimeout(turnPair, 1000);
      function turnPair() {
        let newCards = [];
        for (let i = 0; i < myCards.length; i++) {
          let card = myCards[i];
          if (card.id === pair[0].id || card.id === pair[1].id) {
            newCards.push({ ...card, showValue: false });
          } else {
            newCards.push(card);
          }
        }
        setMyCards(newCards);
        setPair([]);
      }
    } else if (pair.length === 2 && pair[0].emoji == pair[1].emoji) {
      let newCards = [];
      for (let i = 0; i < myCards.length; i++) {
        let card = myCards[i];
        if (card.id === pair[0].id || card.id === pair[1].id) {
          newCards.push({ ...card, showValue: true });
        } else {
          newCards.push(card);
        }
      }
      setMyCards(newCards);
      setPair([]);
    }
  }, [pair]);
  //useEffect pour sortir les confettis
  useEffect(() => {
    let allFlipped = false;
    myCards.forEach((element) => {
      if (!element.showValue) {
        allFlipped = false;
        return;
      } else {
        allFlipped = true;
      }
    });
    setIsWinner(allFlipped);
  }, [myCards]);

  function replay() {
    let shuffledCards = shuffle(cards);
    setMyCards(shuffledCards);
    setCount(0);
    setPair([]);
    setIsWinner(false);
  }

  return (
    <div className="display">
      {isWinner && <Confetti width={width} height={height} />}
      <div className="counter">
        <p>Le compteur : {count}</p>
        <button onClick={() => replay()}>Replay</button>
      </div>
      {myCards.map((item) => (
        <div
          onClick={() => handleClick(item.id, item.showValue, item.emoji)}
          className="card"
          key={item.id}
        >
          {item.showValue ? item.emoji : "X"}
        </div>
      ))}
    </div>
  );
}

export default App;
