import { ReactElement } from "react";

export interface RenderIfProps{
   condition : boolean,
   wrap : (children : ReactElement)=> ReactElement,
   children: ReactElement
}

export const WrapIf : React.FC<RenderIfProps> = (props) => {
      const {condition, wrap, children} = props;
   return condition ? wrap(children) : children;
};
