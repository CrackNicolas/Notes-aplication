import { Fragment, useContext } from "react";

import { Context } from "@/context/provider";

import ComponentNavTop from "@/frontend/components/partials/nav/top";

import { Props_layouts } from "@/frontend/types/props";

export default function Template({ children }: Props_layouts) {
    const props = useContext(Context);

    return (
        <Fragment>
            <ComponentNavTop {...props} />
            {children}
        </Fragment>
    )
}