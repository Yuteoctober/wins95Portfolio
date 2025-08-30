import { useState, useEffect, useContext, useRef } from "react"
import UseContext from "../Context"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import "../css/BTC.css"
import btc_coin from "../assets/btc_icon.webp";

function BTC() {
  const { btcShow, showChart, setShowChart } = useContext(UseContext)
  const [price, setPrice] = useState(null)
  const [detail, setDetail] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [chartData, setChartData] = useState([])
  const socketRef = useRef(null)

  // Fetch historical candles (last 50, 1 min granularity)
  useEffect(() => {
    const fetchHistorical = async () => {
      try {
        const res = await fetch("https://api.exchange.coinbase.com/products/BTC-USD/candles?granularity=60")
        const data = await res.json()

        const formatted = data?.length
          ? data
              .slice(0, 50)
              .reverse()
              .map((candle) => ({
                time: new Date(candle[0] * 1000).toLocaleTimeString(),
                price: Number(candle[3]),
              }))
          : Array.from({ length: 50 }, (_, i) => ({ time: "", price: 0 }))

        setChartData(formatted)
      } catch (err) {
        console.error("Error fetching historical:", err)
        // fallback empty data
        setChartData(Array.from({ length: 50 }, (_, i) => ({ time: "", price: 0 })))
      }
    }

    fetchHistorical()
  }, [refresh])

  // WebSocket live price
  useEffect(() => {
    const socket = new WebSocket("wss://ws-feed.exchange.coinbase.com")
    socketRef.current = socket

    const subscribeMessage = {
      type: "subscribe",
      channels: [{ name: "ticker", product_ids: ["BTC-USD"] }],
    }

    socket.onopen = () => {
      socket.send(JSON.stringify(subscribeMessage))
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setDetail(data)

      if (data.type === "ticker" && data.price) {
        const newPrice = Number.parseFloat(data.price)
        setPrice(newPrice)

        // Append to chart (keep last 50 points)
        setChartData((prev) => [...prev.slice(-49), { time: new Date().toLocaleTimeString(), price: newPrice }])
      }
    }

    socket.onerror = (error) => {
      console.error("WebSocket error:", error)
    }

    socket.onclose = () => {
      console.log("WebSocket connection closed")
    }

    return () => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close()
      }
    }
  }, [btcShow, refresh])

  const percentageValue =
    !detail || !detail.open_24h ? 0 : +(((price - detail.open_24h) / detail.open_24h) * 100).toFixed(2)

  const percentage = `${percentageValue >= 0 ? "+" : ""}${percentageValue}%`

  const volume = !detail
    ? "Loading..."
    : "$" + Math.floor(detail?.volume_24h * ((+detail?.high_24h + +detail?.low_24h) / 2 || 0)).toLocaleString()

  const high = !detail ? "Loading..." : Math.floor(detail?.high_24h).toLocaleString()
  const low = !detail ? "Loading..." : Math.floor(detail?.low_24h).toLocaleString()

  const formattedPrice = price
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
    : null

  return (
    <>
      {btcShow && (
        <div className="btc_widget_win95">
          {/* Main content - made more compact */}
          <div className="btc_content">
            <div className="btc_price_section">
              <div className="btc_price_header">
                <img src={btc_coin} alt="" className="btc_price_icon" />
                <span className="btc_symbol">BTC-USD</span>
              </div>
              <div className="btc_price_main">
                <span className="btc_price">{formattedPrice || "Loading..."}</span>
                <span className={`btc_percentage ${percentageValue >= 0 ? "positive" : "negative"}`}>{percentage}</span>
              </div>
            </div>

            <div className="btc_stats_section">

              <div className="btc_stat_row">
                <div className="btc_stat_item">
                  <span className="btc_stat_label">Vol:</span>
                  <span className="btc_stat_value">{volume}</span>
                </div>
              </div>

              <div className="btc_stat_row">
                <div className="btc_stat_item">
                  <span className="btc_stat_label">High:</span>
                  <span className="btc_stat_value">{high}</span>
                </div>
                </div>

                <div className="btc_stat_row">
                <div className="btc_stat_item">
                  <span className="btc_stat_label">Low:</span>
                  <span className="btc_stat_value">{low}</span>
                </div>
              </div>
            </div>
            {showChart && (
              <div className="btc_chart_section">
              <div className="btc_chart_container">
                {chartData.length > 0 && (
                  <ResponsiveContainer width="100%" height={60}>
                    <LineChart data={chartData} margin={{ top: 6, right: 2, left: 2, bottom: 6 }}>
                      <XAxis dataKey="time" hide />
                      <YAxis hide domain={["dataMin", "dataMax"]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#c0c0c0",
                          border: "2px outset #c0c0c0",
                          borderRadius: "0",
                          fontSize: "10px",
                          fontFamily: "MS Sans Serif, sans-serif",
                          padding: '6px'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#000080"
                        strokeWidth={1}
                        dot={false}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
            )}

            
            <div className="btc_bottom_section">
              <div className="btc_refresh_button"
              onClick={() => setShowChart(!showChart)}
            >
              <p>{showChart ? 'Hide chart' : 'Show chart'}</p>
            </div>

              <button
                className={`btc_refresh_button ${refresh ? "active" : ""}`}
                onClick={() => setRefresh(!refresh)}
                onAnimationEnd={() => setRefresh(false)}
              >
                <p>Refresh</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BTC
