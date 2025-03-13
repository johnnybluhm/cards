'use client';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import './card-styles/cards.css';
import GameComponent from './components/GameComponent';

export default function Home() {

  return (
    <>
      <h3> Play Hearts</h3 >
      <br />
      <br />
      <GameComponent />
    </>
  );
}