import UseContext from '../Context';
import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';
import "../css/NewsApp.css";
import { MdGpsFixed } from "react-icons/md";

function NewsApp() {
    const newsContainerRef = useRef();
    const [Cel, setCel] = useState(true); // Celsius or Fahrenheit
    const [weather, setWeather] = useState(() => {
        const storedTempF = localStorage.getItem('tempF');
        const storedIconCode = localStorage.getItem('iconCode');
        if (storedTempF && storedIconCode) {
            return { temp: JSON.parse(storedTempF), code: parseInt(storedIconCode) };
        }
        return null;
    });

    const [city, setCity] = useState(() => {
        const storedCity = localStorage.getItem('city');
        return storedCity ? JSON.parse(storedCity) : null;
    });

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

    const time = new Date()
    const hours = time.getHours();
    const isNight = hours > 17 || hours < 6;


    const weatherIcons = {
        0: isNight ? '🌙' : '☀️',
        1: isNight ? '🌙' : '🌤️',
        2: isNight ? '🌙' : '⛅',
        3: '☁️',
        45: '🌫️',
        61: '🌧️',
        71: '❄️',
        95: '⛈️',
    };

    useEffect(() => { // call fetchNews when user open news
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
        if(newsPopup){
            getUserLocation();   
        }
    }, [newsPopup]);

    function getUserLocation() {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                fetchWeatherAndCity(lat, lon); // force fetch
            },
            () => setError('Location permission denied')
        );
    }

    function fetchWeatherAndCity(lat, lon) {
        if(!lat || !lon) return;
        // Weather API
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode`;
        fetch(weatherUrl)
            .then((res) => res.json())
            .then((data) => {
                const current = data.current;
                const tempF = ((current.temperature_2m * 9 / 5) + 32).toFixed(0);
                const code = current.weathercode;
                setWeather({ temp: tempF, code: code });
                localStorage.setItem('tempF', JSON.stringify(tempF));
                localStorage.setItem('iconCode', JSON.stringify(code));
            })
            .catch(() => setError('Failed to fetch weather'));

        // City API
        const geoUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
        fetch(geoUrl, {
            headers: {
                'User-Agent': 'NewsApp/1.0 (you@example.com)'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                const address = data.address;
                const cityName = address.city || address.town || address.village || address.state || 'Unknown';
                setCity(cityName);
                localStorage.setItem('city', JSON.stringify(cityName));
            })
            .catch(() => setCity('Unknown'));
    }

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
                                <span className='location'
                                    onClick={() => {
                                        getUserLocation()
                                    }}
                                >
                                    <MdGpsFixed />
                                </span>
                                <h1>{city}</h1>
                                <h1>{weatherIcons[weather.code] || ''}
                                    <span className="temp"
                                        onClick={() => setCel(!Cel)}
                                    >
                                        {Cel? weather.temp : ((weather.temp - 32) * 5 / 9).toFixed(0)}
                                        {Cel? '°F':'°C'}
                                    </span>
                                </h1>
                            </div>
                        )}
                        {error && <p className="error">{error}</p>}

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
