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

interface Props {
    title: string;
    amount: string;
    lastTransaction: string;
    type: 'up' | 'down' | 'total';
}

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
}

export function HighlighCard({
    type,
    title,
    amount,
    lastTransaction
}: Props) {
    return (
        <Container type={type}>
            <Header>
                <Title type={type}>
                    {title}
                </Title>
                <Icon
                    name={icon[type]}
                    type={type}
                />
            </Header>

            <Footer>
                <Amount type={type}>
                    {amount}
                </Amount>
                <LastTransactioon type={type}>
                    {lastTransaction}
                </LastTransactioon>
            </Footer>

        </Container>
    )
}