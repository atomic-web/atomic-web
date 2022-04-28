import { Box } from "grommet";
import { useEffect } from "react";
import {render} from "../../test-utils";
import {useToast} from './use-toast'

describe("Toast" , ()=>{
   it("actions callback is called"  , async()=>{

        const onClose = jest.fn((_,close)=>close());

        const TestComp = ()=>{
            const {addToast} = useToast();

            useEffect(()=>{
                addToast({
                    type:"info",
                    message : "Test",
                    actions : [{
                        content : "Close Toast",
                        handler : onClose
                    }]
                })
            // eslint-disable-next-line react-hooks/exhaustive-deps
            },[]);

            return <Box></Box>
        }

        
        const {findByText} = render(<TestComp/>);
        
        const closeToastButton = await findByText("Close Toast", {});
        closeToastButton.click();

        expect(onClose).toHaveBeenCalled();
   });
});