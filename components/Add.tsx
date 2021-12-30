import { Plus } from "react-feather";

export const Add = (props: any) => (
    <div {...props} className={"add-tab-button"} style={{ display: "flex", minWidth: "28px", width: "28px", height: "28px", alignItems: "center", justifyContent: "center", borderRadius: "8px" }}>
        <Plus width={18} height={18} />
    </div>
)