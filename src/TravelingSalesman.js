import React, { useRef, useState, useEffect } from 'react';
import { useInterval, useTimeout } from './Hooks.js';
import { getRandomIntegerArray, colorToString, invertColor } from './util.js';
import Loader from './Presentation.js';
import './TravelingSalesman.css';

const TravelingSalesman = (props) => {
    let mount = useRef();
    const [tick, setTick] = useState(0);
    const [delay, setDelay] = useState(null);
    const [cities, setCities] = useState({cities: [], hasFetched: true});
    const [citiesToDraw, setCitiesToDraw] = useState([]);
    const squareSampling = 100;
    const numberColors = 500;
    let [presenting, setPresenting] = useState(true);

    useTimeout(() => {
        setPresenting(false);
        setDelay(10);
    }, props.delay);

    useEffect(() => {
        let cancel = false;
        const fetchCitiesSolution = async (url, numberColors, squareSampling) => {
            try {
                let payload = {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                };

                let cityPoints = getRandomIntegerArray(numberColors * 2, 1, squareSampling);
                let citiesUrl = url + "/solve?cities=" + JSON.stringify(cityPoints) + "&dimension=" + 2;

                let response = await fetch(citiesUrl, payload);
                let json = await response.json();
                if (!cancel) {
                    setCities({cities: json, hasFetched: true})
                }  
            } catch (error) {
                console.log("Call to order endpoint failed.", error)
            }
        }
        fetchCitiesSolution(props.url, numberColors, squareSampling);
        return () => cancel=true;
    }, [props.url]);

    useEffect(() => {
        if (citiesToDraw.length > 0 && !presenting) {
            const context = mount.current.getContext('2d');
            const width = mount.current.width;
            const height = mount.current.height;
            context.save();
            context.clearRect(0, 0, width, height);
            context.fillStyle = '#161011';
            context.fillRect(0, 0, width, height);
            context.beginPath();
            context.strokeStyle = '#f0a5a3';
            context.lineWidth = 5;
            for(let i=0; i < citiesToDraw.length; i+=2) {
                context.lineTo(Math.floor(width * citiesToDraw[i] / squareSampling), Math.floor(height * citiesToDraw[i + 1] / squareSampling))    
            }
            context.stroke();
        }

    }, [citiesToDraw, presenting]);

    useInterval(() => {
        const maxBound = (time, size) => {
            let t = time % (2 * size)
            if (t < size) {
                return t;
            }else {
                return size;
            }
        }
        const minBound = (time, size) => {
            let t = time % (2 * size)
            if (t < size) {
                return 0;
            } else {
                return time % size;
            }
        }
        let min = minBound(tick, numberColors + 1);
        let max = maxBound(tick, numberColors + 1);
        let citiesToDraw = cities.cities.slice(min * 2, max * 2);
        setCitiesToDraw(citiesToDraw);
        setTick(tick + 1);
    }, delay);

    let style = {};

    if (props.width > 0 && props.height > 0) {
        style = props.width/props.height< 1 ? {width: "100%"}
                                            : {height: "100%"};
    }

    let minSize = props.width/props.height < 1 ? props.width:
                                                 props.height;
    
    if (citiesToDraw.length >= 0 && !presenting) {
        return (<canvas
                ref={mount}
                width={minSize}
                height={minSize}
                className="TravelingSalesman"
            />);
    } else {
        return <Loader title={props.title}/>;
    }
}

export default TravelingSalesman;
