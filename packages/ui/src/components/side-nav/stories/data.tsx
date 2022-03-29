import { Configure, Dashboard ,Apps, Inbox, User, Basket, Clipboard} from "grommet-icons"
import { SideNavItemProps } from '..';

const  menuItems : SideNavItemProps[] = [
{
      label: "Dashboard" ,
      icon : <Dashboard/>
},
{
      label:"Configurations",
      icon : <Configure/>
},
{
      label:"Apps",
      icon : <Apps/>,
      items : [
            {
                  icon:<Apps/>,
                  label:"App 1",
            },
            {
                  icon:<Apps/>,
                  label:"App 2",
            },
            {
                  icon:<Apps/>,
                  label:"App 3",
            }
      ]     
},
{
      label:"Inbox",
      icon : <Inbox/>
},
{
      label:"Users",
      icon : <User/>
},
{
      label:"Shpping Carts",
      icon : <Basket/>
},{
      label:"Orders",
      icon:<Clipboard />      
}
] 

export default menuItems;