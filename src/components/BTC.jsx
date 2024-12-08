import { useState, useEffect, useContext, useRef } from 'react';
import UseContext from '../Context';
import btc_coin from '../assets/btc_icon.webp'
import { LuRefreshCw } from "react-icons/lu";
import '../css/BTC.css';


function BTC() {

  const { btcShow, setBtcShow } = useContext(UseContext);
  const [price, setPrice] = useState(null);
  const [detail, setDetail] = useState(null)
  const [refresh, setRefresh] = useState(false)
  
  const socketRef = useRef(null); 

  useEffect(() => {
      const socket = new WebSocket("wss://ws-feed.exchange.coinbase.com");
      socketRef.current = socket; // Save the WebSocket instance in ref

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
        console.log(data)
        setDetail(data);
        if (data.type === "ticker" && data.price) {
          setPrice(parseFloat(data.price));
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };

    return () => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close(); // Cleanup WebSocket connection on unmount
      }
    };
  }, [btcShow, refresh]);
  
  const percentageValue = !detail || !detail.open_24h 
  ? 0 
  : +(((price - detail.open_24h) / detail.open_24h) * 100).toFixed(2);

  const percentage = `${percentageValue >= 0 ? "+" : ""}${percentageValue}%`;

  const volume = !detail ? 'Loading...' : '$' + Math.floor(detail?.volume_24h * (+detail?.high_24h + +detail?.low_24h / 2)).toLocaleString();
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
              <LuRefreshCw className={`refresher ${refresh? 'active' : ''}`}
                onClick={() => setRefresh(true)}
                onAnimationEnd={() => setRefresh(false)}
              />
              <div className="container_leftside_btc">
               <div className="leftside_btc">
                 <img src={btc_coin} alt="btc_coin" />
                 <p>BTC-USD</p>
              </div>
              <div className="leftside_btc_btm">
                <p>Vol: 
                  <span style={{position:'relative', left: '7px'}}>
                    {volume}
                  </span>
                </p>
                <span>High: {high}</span>
                <span>Low: {low}</span>
              </div> 
              </div>
              
              <div className="rightside_btc">
                <h2>
                  {formattedPrice || 'Loading...'}
                  <span style={{ color: percentageValue >= 0 ? '#28a745' : '#dc3545' }}>
                    {percentage}
                  </span>
                </h2>
                
              </div>
        </div>
        )}
    </>
    
  )
}

export default BTC;
