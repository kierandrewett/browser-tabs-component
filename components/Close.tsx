export const Close = (props: any) => (
    <div {...props} style={{ display: "flex", position: "relative", height: "7px", marginRight: "6px" }}>
        <div style={{ height: "10px", pointerEvents: "none", width: "1px", backgroundColor: "black", zIndex: 1, position: "absolute", transform: "rotate(45deg)" }}></div>
        <div style={{ height: "10px", pointerEvents: "none", width: "1px", backgroundColor: "black", zIndex: 1, position: "absolute", transform: "rotate(-45deg)" }}></div>
        <div className={"close"} style={{
            width: "20px",
            height: "20px",
            borderRadius: "4px",
            position: "absolute",
            left: "-9.25px",
            top: "-5px",
            zIndex: 0
        }}></div>
    </div>
)