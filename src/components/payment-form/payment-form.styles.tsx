import styled from 'styled-components'
import Button from '../button/button.component'

export const PaymentFormContainer = styled.div`
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (orientation: portrait) {
        width: 100%;
    }
`

export const FormContainer = styled.form`
    height: 100px;
    min-width: 500px;

    @media (orientation: portrait) {
        min-width: 100%;
    }
`

export const PaymentButton = styled(Button)`
    margin-left: auto;
    margin-top: 30px;
`