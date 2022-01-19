import Modal from 'react-modal';
import { useState, FormEvent } from 'react';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { api } from '../../services/api';

interface NewTransactionModalProps {
    isOpen: boolean,
    onRequestClose: () => void;
}

Modal.setAppElement("#root");

export function NewTransactionModal(props: NewTransactionModalProps) {

    const [type, setType] = useState('deposit');
    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');

    function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        const data = {
            title,
            value,
            category
        };

        api.post('/transactions', data);
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
                    value={value} 
                    onChange={event => setValue(+event.target.value)} />

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