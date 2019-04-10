import React, { Component } from 'react';
import { shuffle, cardDeck } from './Cards';
import ControlBar from './components/ControlBar/ControlBar';
import Card from './components/Hands/Card/Card';
import BettingBox from './components/BettingBox/BettingBox';
import Message from './components/GameOverMsg/Message';
import classes from './Blackjack.module.css';

class Blackjack extends Component {
  state = {
    userHand: [],
    userAces: 0,
    userTotal: 0,
    cpuHand: [],
    cpuAces: 0,
    cpuTotal: 0,
    gameOver: false,
    winner: null,
    cpuTurn: false,
    reasonWin: null,
    bank: 900,
    betAmount: 100,
    outOfMoney: false
  }

  //update the score of either player by adding the new card value
  updateTotal = () => {
    this.setState(prevState => ({
      userTotal: prevState.userHand.reduce((sum, card) => {
        return sum + card.value}, 0),
      cpuTotal: prevState.cpuHand.reduce((sum, card) => {
        return sum + card.value}, 0)
    }));
  }

  initialAceCheck = () => {
    let userAce = this.state.userHand.findIndex(card => card.type === 'A');
    let userAce2 = this.state.userHand.reverse().findIndex(card => card.type === 'A');
    let cpuAce = this.state.cpuHand.findIndex(card => card.type === 'A');
    let cpuAce2 = this.state.cpuHand.reverse().findIndex(card => card.type === 'A');
    //if there is at least 1 ace in the hand...
    if (userAce !== -1) {
      //check if there are 2 aces
      if (userAce === userAce2) {
        //there are 2 aces, so set it in state
        this.setState({userAces: 2})
      } else {
        //there is only 1 ace
        this.setState({userAces: 1})
      }
    }
    if (cpuAce !== -1) {
      if (cpuAce === cpuAce2) {
        this.setState({cpuAces: 2})
      } else {
        this.setState({cpuAces: 1})
      }
    }
  }


  naturalCheck = () => {
    let user = this.state.userTotal;
    let cpu = this.state.cpuTotal;
    if (user === 21 && cpu !== 21) {
      //setting cpuTurn to true here is for displaying the hidden dealer card
      this.setState(prevState => ({
        cpuTurn: true, winner: 'USER', 
        gameOver: true,
        bank: Number(prevState.bank) + Number(prevState.betAmount)
      }));
      this.outOfMoneyCheck();
      //plus user gets 1.5 times his bet back
    } else if (user === 21 && cpu === 21) {
      this.setState({cpuTurn: true, winner: 'NOBODY', gameOver: true});
      this.outOfMoneyCheck();
    } else if (user !== 21 && cpu === 21) {
      this.setState(prevState => ({
        cpuTurn: true, 
        winner: 'DEALER', 
        gameOver: true,
        bank: Number(prevState.bank) + Number(prevState.betAmount)
      }));
      this.outOfMoneyCheck();
    }
  };

  bustCheck = () => {
    //If user score is above 21, and there are no aces in hand(or all are using a value of 1)...then user busts
    if (this.state.userTotal > 21 && this.state.userAces === 0) {
      this.setState(prevState => ({
        gameOver: true,
        winner: "DEALER",
        cpuTurn: true,
        bank: Number(prevState.bank) - Number(prevState.betAmount)
      }))
      this.outOfMoneyCheck();
      //if the user has an ace and the total has gone above 21, change the value of the ace to 1 (by subtracting 10), and take the ace off the ace count(for future checks)
    } else if (this.state.userTotal > 21 && this.state.userAces > 0) {
      setTimeout(() => {
        this.setState(prevState => ({
          //might need to adjust this so there is enough time to ensure previous setState has completed.
          userTotal: prevState.userTotal - 10,
          userAces: prevState.userAces - 1
        }))
      }, 800)
    }
    //Now checking if the dealer busted
    if (this.state.cpuTotal > 21 && this.state.cpuAces > 0) {
      this.setState(prevState => ({
        //if they busted with ace, the ace value is changed to 1, dropping the score by 10, and removing 1 from cpuAces.
        //might need to adjust this so there is enough time to ensure previous setState has completed.
        cpuTotal: prevState.cpuTotal - 10,
        cpuAces: prevState.cpuAces - 1
      }))
    } else if (this.state.cpuTotal > 21 && this.state.cpuAces === 0) {
      this.setState(prevState => ({
        gameOver: true, 
        winner: "USER",
        bank: Number(prevState.bank) + Number(prevState.betAmount)
      }))
      this.outOfMoneyCheck();
    }

  }
  
  // playAgain will be a boolean, determining whether the game is starting fresh or just a new hand
  newGame = (playAgain) => {
    //run the shuffle algorithm on the deck of cards
    shuffle(cardDeck);
    //create a hand of 2 cards for both the user and cpu
    this.setState({
      userHand: [cardDeck[0], cardDeck[2]],
      cpuHand: [cardDeck[1], cardDeck[3]],
      //set the top of the deck to be the 5th card
      deckIndex: 4,
      //the next 3 are reset to their initial values for the next hand
      gameOver: false,
      winner: null,
      cpuTurn: false,
      //2 below....
      userAces: 0,
      cpuAces: 0,
      betAmount: 100
    });

    if (!playAgain) {
      this.setState({
        bank: 900,
        outOfMoney: false
      })
    }

    this.updateTotal();
    setTimeout(() => {
      this.initialAceCheck();
      this.naturalCheck();
      console.log(0, this.state.userHand);
    }, 800);
  }

  componentDidMount() {
    this.newGame(false);
  }

  hitHandler = () => {
    if (!this.state.gameOver) {
      console.log(1, this.state.userHand);
      //if the card drawn is an ace...
      if (cardDeck[this.state.deckIndex].type === "A") {
        //increment the ace count in state
        this.setState(prevState => ({
          userAces: prevState.userAces + 1
        }));
      }
      this.setState(prevState => ({
        //take the next card from the deck and
        userHand: [...prevState.userHand, cardDeck[prevState.deckIndex]],
        //increase the users score by the value of the new card
        userTotal: prevState.userTotal + cardDeck[prevState.deckIndex].value,
        //make the top of the deck now equal to the next card
        deckIndex: prevState.deckIndex + 1
      }));
      setTimeout(() => {
        this.bustCheck();
        console.log(2, this.state.userHand);
      }, 1000);
    }
  }


  standHandler = () => {
    if (!this.state.gameOver) {
      //this allows the hidden dealers card to be shown
      this.setState({cpuTurn: true});
      //if the dealer total is 17 or above, stop the turn
      //if dealer hit at least 17 and didn't bust
      if (this.state.cpuTotal >= 17 && this.state.cpuTotal <= 21) {
        //check scores
        if (this.state.userTotal > this.state.cpuTotal) {
          if (this.state.cpuAces === 0) {
            //user wins
            this.setState(prevState => ({
              gameOver: true, 
              winner: "USER",
              bank: Number(prevState.bank) + Number(prevState.betAmount)
            }))
          } else {
            this.setState(prevState => ({
              cpuAces: prevState.cpuAces - 1,
              cpuTotal: prevState.cpuTotal - 10
            }));
          }
        } else if (this.state.cpuTotal > this.state.userTotal) {
          //dealer wins
          this.setState(prevState => ({
            gameOver: true, 
            winner: "DEALER",
            bank: prevState.bank - prevState.betAmount
          }))
          this.outOfMoneyCheck();
        } else {
          //it's a draw
          this.setState({gameOver: true, winner: "NOBODY"})
        }
      } else {
        //cpu takes another card
        if (cardDeck[this.state.deckIndex].type === "A") {
          //increment the ace count in state
          this.setState(prevState => ({
            cpuAces: prevState.cpuAces + 1
          }));
        }

        this.setState(prevState => ({
          cpuHand: [...prevState.cpuHand, cardDeck[prevState.deckIndex]],
          cpuTotal: prevState.cpuTotal + cardDeck[prevState.deckIndex].value,
          deckIndex: prevState.deckIndex + 1
        }));
        setTimeout(() => {
          this.bustCheck();
        }, 700);
      }
      //Keep running the function until gameOver is true
      if (this.state.gameOver === false) {
        setTimeout(()=>{
          this.standHandler();
          console.log(this.state.cpuTotal);
        }, 1000);
      }
    }

  }

  betChangeHandler = (event) => {
    event.persist();
    event.preventDefault();
    this.setState({
      betAmount: event.target.value
    })
  }

  allInHandler = () => {
    this.setState(prevState => ({
      betAmount: prevState.bank
    }))
  }

  outOfMoneyCheck = () => {
    if (this.state.bank === 0) {
      this.setState({
        outOfMoney: true
      })
    }
  }


  render() {
    let userCards, cpuCards;
    if (!Array.isArray(this.state.userHand)) {
      userCards = <p>Error</p>
    } else {
      userCards = this.state.userHand.map((card, i) => {
        return (
          <Card
          symbol={card.type}
          mid={card.img}
          key={`${card.type}-${i}`}/>
        )
      });
    }

    cpuCards = this.state.cpuHand.map((card, i) => {
      if (i !== 1 && this.state.cpuTurn === false) {
        return (
          <Card
          symbol={card.type}
          mid={card.img}
          key={`${card.type}-${i}`}/>
        )
      } else if (i === 1 && this.state.cpuTurn === false){
        return (
          <Card />
        )
      } else if (this.state.cpuTurn === true) {
        return (
          <Card
          symbol={card.type}
          mid={card.img}
          key={`${card.type}-${i}`}/>
        )
      }
    })

    let msg;
    let playAgain = true;
    if (this.state.outOfMoney) {
      msg = <Message>You're out of money!  Nice try, kid.</Message>;
      playAgain = false;
    }
    if (this.state.gameOver && !this.state.outOfMoney) {
      msg = <Message>{`${this.state.winner} WINS`}</Message>
    }

    return (
      <>
        <BettingBox 
          bank={this.state.bank} 
          betAmount={this.state.betAmount} 
          allIn={this.allInHandler}
          betChange={this.betChangeHandler}
          gameOver={this.state.gameOver}/>
        <ControlBar
          disableButton={this.state.gameOver}
          hitHandler={this.hitHandler}
          standHandler={this.standHandler}
          newGameHandler={() => this.newGame(playAgain)}/>
        <div className={classes.Msg}>{msg}</div>
        <div className={classes.HandContainer}>
          <div className={classes.Hand}>
            {userCards}
          </div>
          <div className={classes.Hand}>
            {cpuCards}
          </div>
        </div>
      </>
    )
  }
}

export default Blackjack;