import UseContext from '../Context'
import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { motion, AnimatePresence  } from 'framer-motion';
import "../css/NewsApp.css";

function NewsApp() {
    const newsContainerRef = useRef();
    const [coords, setCoords] = useState(null);
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const [allNews, setAllNews] = useState([]);
    const { newsPopup, setNewsPopup } = useContext(UseContext);

    const hasSeen = new Set();
    const filteredNews = allNews
        .filter(item => {
            if (hasSeen.has(item.url)) return false;
            hasSeen.add(item.url);
            return true;
        })
        .reverse()
        .slice(0, 20);

    const weatherIcons = {
        0: '☀️',
        1: '🌤️',
        2: '⛅',
        3: '☁️',
        45: '🌫️',
        61: '🌧️',
        71: '❄️',
        95: '⛈️',
    };

    useEffect(() => {
        fetchNews();
    }, []);

    async function fetchNews() {
        try {
            const response = await axios.get("https://ai-tweet-bot-mp70.onrender.com/news/getNews");
            setAllNews(response.data.news);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                newsContainerRef.current &&
                !newsContainerRef.current.contains(event.target) &&
                !event.target.closest('.time')
            ) {
                setNewsPopup(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [newsContainerRef]);

    function openNews(url) {
        window.open(url);
    }

    useEffect(() => {
        if (newsPopup) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setCoords({
                        lat: pos.coords.latitude,
                        lon: pos.coords.longitude,
                    });
                },
                () => setError('Location permission denied')
            );
        }
    }, [newsPopup]);

    useEffect(() => {
        if (!coords) return;

        const { lat, lon } = coords;

        // Fetch weather
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode`;
        fetch(weatherUrl)
            .then((res) => res.json())
            .then((data) => {
                const current = data.current;
                setWeather({
                    temp: ((current.temperature_2m * 9/5) + 32).toFixed(0),
                    code: current.weathercode,
                });
            })
            .catch(() => setError('Failed to fetch weather'));

        // Fetch city name
        const geoUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
        fetch(geoUrl, {
            headers: {
                'User-Agent': 'NewsApp/1.0 (your@email.com)'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                const address = data.address;
                const cityName = address.city || address.town || address.village || address.state || 'Unknown';
                setCity(cityName);
            })
            .catch(() => setCity('Unknown'));
    }, [coords]);

    

    return (
        <>
        <AnimatePresence>
            {newsPopup && (
                <motion.div
                className="news_container"
                ref={newsContainerRef}
                initial={{ opacity: 0, x: '-500px' }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: 'easeInOut', duration: 0.3 }}
                exit={{ opacity: 0, x: '-500px' }}
                >
                {weather && (
                    <div className="weather_container">
                    <h1>{city}</h1>
                    <h1>{weatherIcons[weather.code] || '❓'} {weather.temp}°F</h1>
                    </div>
                )}
                
                <h1>Latest News</h1>
                {allNews.length > 0 ? (
                    filteredNews.map((item, index) => (
                    <div className="news" key={index} onClick={() => openNews(item.url)}>
                        <img src={item.urlToImage} alt="" />
                        <h5>{item.originalNews}</h5>
                    </div>
                    ))
                ) : (
                    <p>News are loading...</p>
                )}
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
}

export default NewsApp;
