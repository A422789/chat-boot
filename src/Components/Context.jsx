import { createContext, useState } from "react";

export const SideBarContext=createContext(null);
export const SideBarContextProvider=({children})=>{
     const [sideBarIsOpen,setSideBarIsOpen]=useState(false)
    const contextValue={sideBarIsOpen,setSideBarIsOpen}
    return(
        <SideBarContext value={contextValue}>
            {children}
        </SideBarContext>
    )
}
export default SideBarContextProvider