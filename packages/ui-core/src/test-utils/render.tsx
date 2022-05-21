
import {render as RenderRTL, RenderOptions} from "@testing-library/react";
import { Grommet } from "grommet";
import { ReactElement } from "react";
import { UIProvider } from "../components";

export const render = (ui: ReactElement<unknown>, options?: RenderOptions) => {

    const _options : RenderOptions = {
        ...options,
        //Possible default options go here        
    };
    const component = <Grommet>
        <UIProvider>
            {ui}
        </UIProvider>
    </Grommet>;

    return RenderRTL(component,_options);
}