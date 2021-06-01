import React from 'react';
import {
    Container,
    Amount,
    Footer,
    Header,
    Icon,
    LastTransactioon,
    Title
} from './styles';


export function HighlighCard() {
    return (
        <Container>
            <Header>
                <Title>Entrada</Title>
                <Icon name="arrow-up-circle" />
            </Header>

            <Footer>
                <Amount>R$ 17.400,00</Amount>
                <LastTransactioon>Última entrada dia 13 de abril</LastTransactioon>
            </Footer>

        </Container>
    )
}