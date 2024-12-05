import { useState, useEffect, useContext, useRef } from 'react';
import UseContext from '../Context';
import btc_coin from '../assets/btc_icon.webp'
import '../css/BTC.css';


function BTC() {

  const { btcShow, setBtcShow } = useContext(UseContext);
  const [price, setPrice] = useState(null);
  const [detail, setDetail] = useState(null)
  
  useEffect(() => {
    const socket = new WebSocket('wss://ws-feed.exchange.coinbase.com');

    const subscribeMessage = {
      type: "subscribe",
      channels: [
        {
          name: "ticker",
          product_ids: ["BTC-USD"], 
        },
      ],
    };

    socket.onopen = () => {
      socket.send(JSON.stringify(subscribeMessage)); // Send subscription message
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setDetail(data)
      if (data.type === "ticker" && data.price) {
        setPrice(parseFloat(data.price));
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, [btcShow]);
  
  
  const volume = !detail ? 'Loading...' : '$' + Math.floor(detail?.volume_24h * detail?.price).toLocaleString();
  const high = !detail ? 'Loading...' : Math.floor(detail?.high_24h).toLocaleString();
  const low = !detail ? 'Loading...' : Math.floor(detail?.low_24h).toLocaleString();
  // Format the price with commas
  const formattedPrice = price
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
    : null;

  return (
    <>
        {btcShow && (
            <div className='btc_container'>
              <div className="container_leftside_btc">
               <div className="leftside_btc">
                 <img src={btc_coin} alt="btc_coin" />
                 <p>BTC-USD</p>
              </div>
              <div className="leftside_btc_btm">
                <p>Vol: {volume}</p>
                <span>High: {high}</span>
                <span>Low: {low}</span>
              </div> 
              </div>
              
              <div className="rightside_btc">
                <h2>
                  {formattedPrice || 'Loading...'}
                </h2>
              </div>
         
            
        </div>
        )}
    </>
    
  )
}

export default BTC;
