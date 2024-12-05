import { useState, useEffect, useContext, useRef } from 'react';
import UseContext from '../Context';
import btc_coin from '../assets/btc.gif'


function BTC() {

  const { btcShow, setBtcShow } = useContext(UseContext);
  const [price, setPrice] = useState(null);
  
  useEffect(() => {
    const socket = new WebSocket('wss://ws-feed.exchange.coinbase.com');

    const subscribeMessage = {
      type: "subscribe",
      channels: [
        {
          name: "ticker",
          product_ids: ["BTC-USD"], // Replace with the currency pair you want
        },
      ],
    };

    socket.onopen = () => {
      console.log('WebSocket connected');
      socket.send(JSON.stringify(subscribeMessage)); // Send subscription message
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
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
  }, []);
  
  
  

  // Format the price with commas
  const formattedPrice = price
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
    : null;

  return (
    <>
        {btcShow && (
            <div className='btc_container'
            style={{
                display: 'flex',
                width: '150px',
                height: '150px',
                position: 'absolute',
                justifyContent:'center',
                alignItems:'center',
                flexDirection: 'column',
                right: '.5rem',
                top: '.5rem',
                gap: '.5rem'
            }}
        >
          <img src={btc_coin} alt="btc_coin" 
            style={{
                width: '50%',
                height: '50%'
            }}
          />
            <h2 style={{letterSpacing: '.1rem', fontSize: '22px', color: 'black'}}>
            {formattedPrice || 'Loading...'}
            </h2>
        </div>
        )}
    </>
    
  )
}

export default BTC;
