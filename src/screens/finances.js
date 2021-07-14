import React from 'react';
import Navigation from './Navigation';


const financeScreen = ()=>{
// displays finances information
    return(
        <div>
            <div className="finances-content">
                <iframe
                    className="finances-iframe"
                    src='https://www.youtube.com/embed/LBC16jhiwak'
                    frameBorder="0"
                    allow="accelerometer: autoplay; clipboard-write; encrypted-media; gryscope; picture-in-picture"
                    allowFullScreen
                    title='YouTube Video'
                />
                 <iframe
                    className="finances-iframe"
                    src='https://www.youtube.com/embed/sd9yLmJ1Jfk'
                    frameBorder="0"
                    allow="accelerometer: autoplay; clipboard-write; encrypted-media; gryscope; picture-in-picture"
                    allowFullScreen
                    title='YouTube Video'
                />
                 <iframe
                    className="finances-iframe"
                    src='https://www.youtube.com/embed/9qWZALyGSmg'
                    frameBorder="0"
                    allow="accelerometer: autoplay; clipboard-write; encrypted-media; gryscope; picture-in-picture"
                    allowFullScreen
                    title='YouTube Video'
                />
                <iframe
                    className="finances-iframe"
                    src='https://www.youtube.com/embed/jwXlo9gy_k4'
                    frameBorder="0"
                    allow="accelerometer: autoplay; clipboard-write; encrypted-media; gryscope; picture-in-picture"
                    allowFullScreen
                    title='YouTube Video'
                />
                <iframe
                    className="finances-iframe"
                    src='https://www.youtube.com/embed/pRATyVNbgXg'
                    frameBorder="0"
                    allow="accelerometer: autoplay; clipboard-write; encrypted-media; gryscope; picture-in-picture"
                    allowFullScreen
                    title='YouTube Video'
                />

              

            </div>
        </div>
    )
}
export default financeScreen;