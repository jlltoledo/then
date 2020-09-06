import React, { Fragment, useEffect, useState, useContext, onEffect } from 'react';
import { useLocation, Navigate, useNavigate, useParams, Routes, Route, Outlet } from 'react-router-dom';
import Menu from './Menu.js';

import Anaglyph from './Anaglyph.js';

import Autostereogram from './Autostereogram.js';
import Colors from './Colors.js';
import Distrito from './Distrito.js';


import Bolero from './Bolero.js';
import Conway from './Conway.js';
import Dense from './Dense.js';
import Mandelbrot from './Mandelbrot.js';
import Masonry from './Masonry.js';
import Voronoi from './Voronoi.js';
import Reinforcement from './Reinforcement.js';
import Wigglegram from './Wigglegram.js';
import Hilbert from './Hilbert.js';
import Corrupted from './Corrupted.js';
import Then from './Then.js';
import TravelingSalesman from './TravelingSalesman.js'

import Loader from './Loader.js';
import ReactMarkdown from "react-markdown";

import './Home.css';

import anaglyph from './Anaglyph.md';
import autostereogram from './Autostereogram.md';
import colors from './Colors.md';
import distrito from './Distrito.md';
import bolero from './Bolero.md';
import dense from './Dense.md';
import conway from './Conway.md';
import film from './Film.md';
import mandelbrot from './Mandelbrot.md';
import voronoi from './Voronoi.md';
import hilbert from './Hilbert.md';
import corrupt from './Corrupt.md';
import reinforcement from './Reinforcement.md';
import travelingSalesman from './TravelingSalesman.md'


import about from './About.md';
import stereoPhotography from './StereoPhotography.md';

import { ThemeContext } from './ThemeContext.js';
import Slider from './Slider.js';

const presentationTime = 0;

const banditHost = process.env.REACT_APP_API_BANDIT_HOST;

const mapping = {
    "/dense": {content: dense,
               component: <Dense title="dense" 
                                 style={{ position: "absolute" }}
                                 delay={presentationTime}  
                                 width={window.innerWidth} 
                                 height={window.innerHeight} 
                                 url={banditHost} /> },
    
    "/mandelbrot": {content: mandelbrot,
                    component: <Mandelbrot title="mandelbrot"
                                           style={{ position: "absolute" }}
                                           delay={presentationTime} 
                                           width={window.innerWidth} 
                                           height={window.innerHeight} />},
    
    "/voronoi": {content: voronoi,
                 component: <Voronoi title="voronoi" 
                                     style={{ position: "absolute" }}
                                     delay={presentationTime}  
                                     width={window.innerWidth} 
                                     height={window.innerHeight} />},

    "/stereo-photography": {content: stereoPhotography,
                            component: <Wigglegram 
                                       title="stereo photography" 
                                       style={{ position: "absolute" }}
                                       delay={presentationTime}  
                                       width={window.innerWidth} 
                                       height={window.innerHeight} />},

    "/hilbert": {content: hilbert,
                 component: <Hilbert title="hilbert" 
                                     style={{ position: "absolute" }}
                                     delay={presentationTime} 
                                     width={window.innerWidth} 
                                     height={window.innerHeight} />},

    "/corrupt": {content: corrupt,
                 component: <Corrupted title="corrupted" 
                                       style={{ position: "absolute" }}
                                       delay={presentationTime} 
                                       width={window.innerWidth} 
                                       height={window.innerHeight} />}, 
    "/reinforcement-learning": {content: reinforcement,
                                component: <Reinforcement title="reinforcement learning"
                                                          style={{ position: "absolute" }} 
                                                          delay={presentationTime}  
                                                          width={window.innerWidth} 
                                                          height={window.innerHeight} />},
    "/anaglyph": {content: anaglyph,
                  component: <Anaglyph title="anaglyph" 
                                       style={{ position: "absolute" }} 
                                       delay={presentationTime} 
                                       width={window.innerWidth} 
                                       height={window.innerHeight} 
                                       url={banditHost} />},
    "/traveling-salesman": {content: travelingSalesman,
                            component: <TravelingSalesman title="traveling salesman" delay={presentationTime} 
                                                          style={{ position: "absolute" }} 
                                                          width={window.innerWidth} 
                                                          height={window.innerHeight} 
                                                          url={banditHost} />},
    "/conway": {content: conway,
                component: <Conway title="conway" 
                                   style={{ position: "absolute" }} 
                                   delay={presentationTime} 
                                   width={window.innerWidth} 
                                   height={window.innerHeight} />},
    "/film": {content: film,
              component: <Masonry title="film" 
                                  style={{ position: "absolute" }}
                                  delay={presentationTime}  
                                  width={window.innerWidth} 
                                  height={window.innerHeight} 
                                  url={banditHost + "/wigglegrams/jpg"} 
                                  rows={1} />},
    "/bolero": {content: bolero,
                component: <Bolero title="bolero" 
                                   style={{ position: "absolute" }}
                                   delay={presentationTime} 
                                   width={window.innerWidth} 
                                   height={window.innerHeight} 
                                   url={banditHost + "/boleros/en"} />},

    "/1986": {content: distrito,
              component: <Distrito title="1986"
                                   style={{ position: "absolute" }}
                                   delay={presentationTime}  
                                   width={window.innerWidth}
                                   height={window.innerHeight} />},
    "/autostereogram": {content: autostereogram,
                        component: <Autostereogram title="autostereogram"
                                                   delay={presentationTime}  
                                                   style={{ position: "absolute" }}
                                                   width={window.innerWidth}
                                                   height={window.innerHeight} />},
    "/colors": {content: colors,
                        component: <Colors title="colors"
                                           delay={presentationTime}  
                                           style={{ position: "absolute" }}
                                           width={window.innerWidth}
                                           height={window.innerHeight}  
                                           url={banditHost} />},


}

const Project = (props) => {

    let [markdown, setMarkdown] = useState(null);

    let { slug } = useParams();

    useEffect(() => {
        let cancel = false;
        const fetchMarkdown = async (url) => {
            try {
                let response = await fetch(url);
                let text = await response.text()
                if (!cancel) {
                    console.log(text)
                    setMarkdown(text)
                }  
            } catch (error) {
                console.log("Markdown loading failed.", error)
            }
        }
        fetchMarkdown(mapping["/" + slug].content);
        
        props.setIndexBackground("/" + slug);

        return () => cancel=true;
    }, [slug])

    return <div style={{ width: "500px", height: "100vh", position: "fixed", top: "0", right: "0", background:"white",  mixBlendMode: "normal" }}>
            <ReactMarkdown source={markdown} />
           </div>
}

const Container = (props) => {

    let theme = useContext(ThemeContext);

    return <div style={{ background: theme.theme.background, 
                         color: theme.theme.foreground,
                         width: "100vw",
                         height: "100vh" }}>
                {props.background}
                <Outlet />
                <div className="Home-slider">
                    <Slider />
                </div>
           </div>
}

const ProjectMenu = (props) => {

    return <Menu options={Object.keys(mapping)}
                 style={{backgroundColor: "transparent"}}
                 setIndexBackground={props.setIndexBackground} ></Menu>
}


const Home = (props) => {

    let [indexBackground, setIndexBackground] = useState(null);
    let navigate = useNavigate();
    


    let [markdown, setMarkdown] = useState(null);

    useEffect(() => {
        let cancel = false;
        const fetchMarkdown = async (url) => {
            try {
                let response = await fetch(url);
                let text = await response.text()
                if (!cancel) {
                    console.log(text)
                    setMarkdown(text)
                }  
            } catch (error) {
                console.log("Markdown loading failed.", error)
            }
        }
        fetchMarkdown(about);
        return () => cancel=true;
    }, [])

    return <Fragment>
            
            <Routes>
                <Route path="/" element={ <Container background={indexBackground===null?null:mapping[indexBackground].component} 
                                                     setIndexBackground={setIndexBackground} /> } >
                    <Route path="/" element={ <Then /> } />
                    <Route path="projects" element={ <ProjectMenu setIndexBackground={setIndexBackground} /> } />
                    <Route path="projects/:slug" element={ <Project setIndexBackground={setIndexBackground} /> } />
                    <Route path="about" element={ <ReactMarkdown source={markdown} /> } />
                </Route>

            </Routes>
            
           </Fragment>;

}

export default Home;