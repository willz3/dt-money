import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useState } from 'react';

interface NewTransactionModalProps {
    isOpen: boolean,
    onRequestClose: () => void;
}

Modal.setAppElement("#root");

export function NewTransactionModal(props: NewTransactionModalProps) {

    const [type, setType] = useState('deposit');

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
            <Container>
                <h2>Cadastrar transação</h2>

                <input type="text" placeholder="Título"/>
                <input type="number" placeholder="Valor"/>
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
                <input type="text" placeholder="Categoria"/>
                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    )
}