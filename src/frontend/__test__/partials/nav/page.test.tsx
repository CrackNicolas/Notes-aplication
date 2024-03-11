import { render } from "@testing-library/react"

import ComponentNav from "@/frontend/components/partials/nav/container"

describe('Nav', () => {
    it('Renderizacion correcta', () => {
        render(<ComponentNav />)
    })
})