import React from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { HighlighCard } from '../../components/HighlighCard';
import { TransactionCard } from '../../components/TransactionCard';

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

export function Dashboard() {
    const data = [
        {
            title: 'Desenvolvimento de site',
            amount: 'R$ 12.000,00',
            category: {
                name: 'Vendas',
                icon: 'dollar-sign'
            },
            date: '13/04/2021'
        },
        {
            title: 'Desenvolvimento de site',
            amount: 'R$ 12.000,00',
            category: {
                name: 'Vendas',
                icon: 'dollar-sign'
            },
            date: '13/04/2021'
        },
        {
            title: 'Desenvolvimento de site',
            amount: 'R$ 12.000,00',
            category: {
                name: 'Vendas',
                icon: 'dollar-sign'
            },
            date: '13/04/2021'
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
                    renderItem={({ item }) => <TransactionCard data={item} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: getBottomSpace()
                    }}
                />

            </Transactions>
        </Container>
    )
}
