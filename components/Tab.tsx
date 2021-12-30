import anime from "animejs";
import React from "react";
import styles from "../pages/index.module.css";
import { Close } from "./Close";
import { Favicon } from "./Favicon";

export const Tab = (props: any) => {
    const [hovered, setHovered] = React.useState(false);

    const onCloseClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        
        props.setActive(0);

        animate("width", 0)
            .then(() => {
                const el: any = document.getElementById(`tab-${props.index}`)
                el.hidden = true;
            })
    }

    const onTabClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        e.stopPropagation();
        
        props.setActive(index);
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

    React.useEffect(() => {
        animate("width", 250);
    }, []);

    return (
        <div 
            id={`tab-${props.index}`}
            className={styles.tab}

            data-active={props.index == props.active}
            data-hovered={hovered}

            onClick={(e) => onTabClick(e, props.index)}

            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className={styles.tabContainer}>
                <Favicon hostname={props.hostname} />
                <span style={{ width: "100%" }}>{props.title}</span>
                <Close onClick={onCloseClick} />
            </div>
        </div>
    )
}