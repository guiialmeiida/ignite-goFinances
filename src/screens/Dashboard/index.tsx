import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

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
    LogoutButton,
    LoadContainer
} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
    lastTransaction: string;
}
interface HighlightData {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
}

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    const theme = useTheme();

    function getLastTransactionDate(
        collection: DataListProps[],
        type: 'positive' | 'negative'
    ) {
        const lastTransactions = new Date(
            Math.max.apply(Math, collection
                .filter(transaction => transaction.type === type)
                .map(transaction => new Date(transaction.date).getTime())))

        return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString('pt-BR', { month: 'long' })}`;
    }

    async function loadTransactions() {
        const dataKey = '@goFinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions
            .map((item: DataListProps) => {

                if (item.type === 'positive') {
                    entriesTotal += Number(item.amount)
                } else {
                    expensiveTotal += Number(item.amount)
                }

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

        setTransactions(transactionsFormatted);

        const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
        const lastTransactionExpensive = getLastTransactionDate(transactions, 'negative');
        const totalInterval = `01 a ${lastTransactionExpensive}`;

        const total = entriesTotal - expensiveTotal;

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última entrada dia ${lastTransactionExpensive}`,
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: totalInterval,
            }
        });

        setIsLoading(false);

    }

    useEffect(() => {
        loadTransactions();
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));

    return (
        <Container>
            {
                isLoading ?
                    <LoadContainer>
                        <ActivityIndicator
                            color={theme.colors.primary}
                            size='large'
                        />
                    </LoadContainer> :
                    <>
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
                                amount={highlightData.entries.amount}
                                lastTransaction={highlightData.entries.lastTransaction}
                            />
                            <HighlighCard
                                type="down"
                                title="Saidas"
                                amount={highlightData.expensives.amount}
                                lastTransaction={highlightData.expensives.lastTransaction}
                            />
                            <HighlighCard
                                type="total"
                                title="Total"
                                amount={highlightData.total.amount}
                                lastTransaction={highlightData.total.lastTransaction}
                            />
                        </HighlighCards>

                        <Transactions>
                            <Title>Listagem</Title>

                            <TransactionList
                                data={transactions}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => <TransactionCard data={item} />}
                            />

                        </Transactions>
                    </>
            }
        </Container >
    )
}
