import React from "react";
import { Loader } from "react-feather";

export const Favicon = ({ hostname }: { hostname: string }) => {
    const [loaded, setLoaded] = React.useState(false);

    return (
        <div className={"tab-icon"}>
            {loaded == false && <Loader width={16} className={"spin"} height={16} style={{ position: "absolute" }} />}
            <img 
                onLoad={() => setLoaded(true)} 
                style={{ width: "16px", height: "16px" }} 
                src={`/api/favicon?url=https://${hostname}`} 
            />
        </div>
    )
}