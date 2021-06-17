import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

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
    LogoutButton
} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    const [data, setData] = useState<DataListProps[]>([]);

    async function loadTransactions() {
        const dataKey = '@goFinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        const transactionsFormatted: DataListProps[] = transactions
            .map((item: DataListProps) => {
                const amount = Number(item.amount)
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });

                const date = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }).format(new Date(item.date));

                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date,
                }
            })

        setData(transactionsFormatted);

    }

    useEffect(() => {
        loadTransactions();
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));

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
                    <LogoutButton onPress={() => { }}>
                        <Icon name="power" />
                    </LogoutButton>
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
