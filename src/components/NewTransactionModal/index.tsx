import Modal from 'react-modal';
import { useState, FormEvent, useContext } from 'react';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { TransactionsContext } from '../../TransactionsContext';

interface NewTransactionModalProps {
    isOpen: boolean,
    onRequestClose: () => void;
}

Modal.setAppElement("#root");

export function NewTransactionModal(props: NewTransactionModalProps) {

    const { createTransaction } = useContext(TransactionsContext);

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type
        });

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        
        props.onRequestClose();
    }

    return (
        <Modal 
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose} 
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button 
                type="button" 
                onClick={props.onRequestClose} 
                className="react-modal-close"
            >
                <img src={closeImg} alt="Fechar modal"/>        
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>

                <input type="text" placeholder="Título" 
                    value={title} 
                    onChange={event => setTitle(event.target.value)} />
                <input type="number" placeholder="Valor"
                    value={amount} 
                    onChange={event => setAmount(+event.target.value)} />

                <TransactionTypeContainer>
                    <RadioBox 
                        type="button"
                        isActive={type === 'deposit'}
                        onClick={() => setType('deposit')}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox 
                        type="button"
                        isActive={type === 'withdraw'}
                        onClick={() => setType('withdraw')}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input type="text" placeholder="Categoria"
                    value={category} 
                    onChange={event => setCategory(event.target.value)} />
                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    )
}