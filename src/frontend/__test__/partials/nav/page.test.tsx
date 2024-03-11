import '@testing-library/jest-dom'

import { render, screen } from "@testing-library/react"

import ComponentNav from "@/frontend/components/partials/nav/container"

describe('Nav', () => {
    it('Renderizacion correcta', () => {
        render(<ComponentNav section_current="/" user={{}} button_login={<></>} />)

        const link_home = screen.getByTitle('Logo');

        expect(link_home).toBeInTheDocument();
    })
})