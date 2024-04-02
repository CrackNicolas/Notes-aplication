import { Fragment, useContext } from "react";

import { Context } from "@/context/provider";

import ComponentNav from "@/frontend/components/partials/nav/container";

import { Props_layouts } from "@/frontend/types/props";

export default function Template({ children }: Props_layouts) {
    const props = useContext(Context);

    return (
        <Fragment>
            <ComponentNav {...props} />
            {children}
        </Fragment>
    )
}