import React from 'react';

import { HighlighCard } from '../../components/HighlighCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import {
    Container,
    Header,
    Icon,
    Photo,
    User,
    UserGreeting,
    UserInfo,
    UserName,
    UserWrapper,
    HighlighCards,
    Transactions,
    Title,
    TransactionList,
} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    const data: DataListProps[] = [
        {
            id: '1',
            type: 'positive',
            title: 'Desenvolvimento de site',
            amount: 'R$ 12.000,00',
            category: {
                name: 'Vendas',
                icon: 'dollar-sign'
            },
            date: '13/04/2021'
        },
        {
            id: '2',
            type: 'negative',
            title: 'Hamburgueria Pizzy',
            amount: 'R$ 59,99',
            category: {
                name: 'Alimentação',
                icon: 'coffee'
            },
            date: '10/04/2021'
        },
        {
            id: '3',
            type: 'negative',
            title: 'Aluguel do apartamento',
            amount: 'R$ 1.200,00',
            category: {
                name: 'Casa',
                icon: 'shopping-bag'
            },
            date: '10/04/2021'
        },
    ];

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/29558688?v=4' }}
                        />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Guilherme</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power" />
                </UserWrapper>
            </Header>

            <HighlighCards>

                <HighlighCard
                    type="up"
                    title="Entradas"
                    amount="R$ 17.400,00"
                    lastTransaction="Última entrada dia 13 de abril"
                />
                <HighlighCard
                    type="down"
                    title="Saidas"
                    amount="R$ 1.259,00"
                    lastTransaction="Última entrada dia 03 de abril"
                />
                <HighlighCard
                    type="total"
                    title="Total"
                    amount="R$ 16.141,00"
                    lastTransaction="1 à 16 de abril"
                />
            </HighlighCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />

            </Transactions>
        </Container>
    )
}
