import { Box } from "grommet"
import { SideNav } from ".."
import menuItems from "./data"

export default{
      title:"Navigation/SideNav/Default",
}

const Default = () => {

      return <Box width="medium" background="light-2" fill="vertical">
         <SideNav items={menuItems} fill/>
     </Box> 
}

Default.args = {
    full:true  
}

export {Default}