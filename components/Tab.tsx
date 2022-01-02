import anime from "animejs";
import React from "react";
import styles from "../pages/index.module.css";
import { Close } from "./Close";
import { Favicon } from "./Favicon";

export const Tab = (props: any) => {
    const [hovered, setHovered] = React.useState(false);
    const [inTransit, setInTransit] = React.useState(false);
    
    const onDocumentMouseMove = (e?: MouseEvent, tabX?: number) => {
        if(!e || tabX == undefined) return;

        enum Direction {
            Forward,
            Backward
        }

        const x = e.pageX;
        const diff = x - tabX;
        const direction = diff > 0 
            ? Direction.Forward 
            : Direction.Backward;

        const isLastTabMovingForwards = (
            props.index == props.tabs.length-1 && 
            direction == Direction.Forward
        )

        const isFirstTabMovingBackwards = (
            props.index == 0 && 
            direction == Direction.Backward
        )

        const limitedX = Math[
            isLastTabMovingForwards ? "min" : "max"
        ](diff, isLastTabMovingForwards ? 10 : -10);

        if(
            isLastTabMovingForwards || 
            isFirstTabMovingBackwards
        ) {
            animate("translateX", limitedX);

            if(isLastTabMovingForwards) animate("opacity", 1.8 - (limitedX / 10));
            else animate("opacity", 1.8 + (limitedX / 10));

            return;
        }

        if(!inTransit) setInTransit(true);
        style("translateX", diff);
    }

    const onCloseClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        
        props.setActive(0);

        animate("width", 0)
            .then(() => {
                const el: any = document.getElementById(`tab-${props.index}`)
                el.outerHTML = "";
            })
    }

    const onTabClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        e.stopPropagation();
        
        props.setActive(index);
    }

    const onTabMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        onTabClick(e, props.index)

        const currentX = e.pageX;
        document.documentElement.onmousemove = (e) => onDocumentMouseMove(e, currentX);
        document.documentElement.onmouseup = onTabMouseUp;
    }

    const onTabMouseUp = () => {
        animate("translateX", 0);
        animate("opacity", 1);

        document.documentElement.onmousemove = null;
        document.documentElement.onmouseup = null;
    }

    const animate = async (key: string, value: any, duration?: number) => {
        return new Promise((resolve) => {
            const animation = anime({
                targets: `#tab-${props.index}`,
                [key]: value,
                duration: duration || 200,
                easing: "easeOutQuint"
            });

            setTimeout(() => {
                resolve(animation);
            }, duration || 200);
        });
    }

    const style = (key: string, value: any) => {
        const el: any = document.getElementById(`tab-${props.index}`);

        if(el) {
            const transformProperties = [
                "translateX",
                "translateY",
                "translateZ",
                "scaleX",
                "scaleY",
                "scaleZ",
                "rotateX",
                "rotateY",
                "rotateZ",
                "skewX",
                "skewY",
                "perspective"
            ]

            if(transformProperties.includes(key)) {
                let transformCompiled = [
                    ...(el.style.transform || "").split(" ")
                ];

                transformCompiled.forEach((t, i) => {
                    const key = t.split("(")[0];

                    if(transformProperties.includes(key)) {
                        transformCompiled[i] = null;
                    }
                })

                transformCompiled = transformCompiled.filter(i => i !== null);

                if(typeof value == "number") value = `${value}px`
                transformCompiled.push(`${key}(${value})`)

                el.style.transform = transformCompiled.join(" ");
            } else {
                el.style[key] = value;
            }
        }
    }

    React.useEffect(() => {
        animate("width", 250);
    }, []);

    return (
        <div 
            id={`tab-${props.index}`}
            className={`tab ${styles.tab}`}

            data-active={props.index == props.active}
            data-hovered={hovered}
            data-transit={inTransit}

            draggable={false} /* Disable the native HTML draggability */

            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}

            onMouseDown={onTabMouseDown}
            onMouseUp={onTabMouseUp}
        >
            <div className={styles.tabContainer}>
                <Favicon hostname={props.hostname} />
                <span style={{ width: "100%" }}>{props.title}</span>
                <Close onMouseDown={(e: any) => e.stopPropagation()} onClick={onCloseClick} />
            </div>
        </div>
    )
}