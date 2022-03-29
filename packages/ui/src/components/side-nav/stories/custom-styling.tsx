import { Box } from "grommet"
import styled from "styled-components"
import { SideNav } from ".."
import menuItems from "./data"
import {StyledSideNavItem} from "..";

export default{
      title:"Navigation/SideNav/Custom Styling",
}

const CustomSideNav = styled(SideNav).attrs({
    background:'light-2'
})`
    & ${StyledSideNavItem} {
        
    }
`

const CustomStyling = () => {

      return <Box
            fill="vertical"
            width="medium">
         <CustomSideNav 
         items={menuItems} 
         itemBackground="light-2"
         itemHoverBackground="brand"
         fill="vertical"
         />
     </Box> 
}

CustomStyling.args = {
    full:true
}

export {CustomStyling}