import React from "react";
import { Add } from "../components/Add";
import { Close } from "../components/Close";
import { Favicon } from "../components/Favicon";
import { Tab } from "../components/Tab";
import { sites } from "../data/sites";
import styles from "./index.module.css";

const Home = () => {
    const [tabs, setTabs] = React.useState<{ title: string, hostname: string, closing?: boolean }[]>();
    const [active, setActive] = React.useState(0);

    const onTabClose = (index: number) => {
        const t = tabs as any;
        t[index].closing = true;

        console.log(t);
        setTabs(t);
    }

    return (
        <div className={styles.container}>
            <small>{`Active tab: ${tabs?.length ? (tabs as any)[active].title : ""} (index: ${active})`}</small>

            <div className={styles.tabWrapper}>
                {tabs?.map((t, i) => {
                    if(!("closing" in t)) t.closing = false;

                    return (
                        <Tab 
                            active={active}
                            setActive={setActive} 
                            index={i}
                            opener={i-1}
                            key={i}
                            tabs={tabs}
                            onTabClose={onTabClose}
                            {...t}
                        />
                    )
                })}

                <Add onClick={() => {
                    setTabs([
                        ...tabs || [],
                        sites[Math.floor(Math.random() * sites.length)]
                    ]);
                    if(tabs) setActive(tabs.length);
                }} />
            </div>
        </div>
    )
}

export default Home;