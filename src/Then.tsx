import React, { Fragment, useContext, useState, useEffect } from 'react';
import './Then.css'
import { useInterval } from './Hooks.js';
import { ThemeContext } from './ThemeContext.js';
import CSS from "csstype";
/**
              <p className="pronunciation">/ <span className="underline">TH</span>en /</p>
              <p className="type">adverb</p>
              <ol>
                <li><p>at that time; at the time in question.</p></li>
                <li><p>after that; next; afterward.</p></li>
                <li><p>in that case; therefore.</p></li>
              </ol>

**/

interface Props {
    keys: Array<number>;
    setIndexBackground: (index: number) => void;
}

const Then = (props: Props) => {

    const theme = useContext(ThemeContext);
    let [tick, setTick] = useState(0);

    useInterval(() => {
        props.setIndexBackground(props!.keys[tick % props.keys.length]);
        setTick(tick + 1);
    }, 10000);

    useEffect(() => {
        let index = Math.floor(Math.random() * props.keys.length)
        props.setIndexBackground(props!.keys[index]);
        setTick(tick + 1);

    }, []);

    let style: CSS.Properties = {
        color: theme.theme.foreground,
        mixBlendMode: theme.theme.mixBlendMode as CSS.Property.MixBlendMode,
    };

    return <div className="Then" style={style}> 
                    <h1 className="name">Then</h1>
           </div>;
}

export default Then;
