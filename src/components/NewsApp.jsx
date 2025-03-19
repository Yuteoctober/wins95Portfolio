import UseContext from '../Context'
import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { motion, AnimatePresence  } from 'framer-motion';
import "../css/NewsApp.css";

function NewsApp() {
    const newsContainerRef = useRef()
    const [allNews, setAllNews] = useState([]); 
    const { newsPopup, setNewsPopup } = useContext(UseContext);
    
    const hasSeen = new Set();
    const filteredNews  = allNews
        .filter(item => {
            if (hasSeen.has(item.url)) return false;
            hasSeen.add(item.url);
            return true;
    }).reverse().slice(0,20);

    useEffect(() => {
        fetchNews();
    }, []);

    async function fetchNews() {
        try {
            const response = await axios.get("https://ai-tweet-bot-gnie.onrender.com/news/getNews");
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
    
        // Add event listeners for clicks and touches
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [newsContainerRef]);
    

    function openNews(url) {
        window.open(url)
    }

    return (
        <>
        <AnimatePresence>
            {newsPopup && (
                <motion.div className="news_container"
                    ref={newsContainerRef}
                    initial={{opacity: 0, x:'-500px'}}
                    animate={{opacity: 1, x: 0}}
                    transition={{ ease: 'easeInOut', duration: 0.3}}
                    exit={{opacity: 0, x:'-500px'}}
                >
                <h1>Latest News</h1>
                {allNews.length > 0 ? (
                    filteredNews.map((item, index) => (
                        <div className="news" key={index}
                            onClick={() => openNews(item.url)}
                        >
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
