package com.inatandev.desafio_contatos_api.application.services;

import com.inatandev.desafio_contatos_api.domain.repositors.ContatoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import com.inatandev.desafio_contatos_api.domain.model.Contato;

import com.inatandev.desafio_contatos_api.application.services.ContatoService;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ContatoServiceTest {

    @Mock
    private ContatoRepository contatoRepository;

    @InjectMocks
    private ContatoService contatoService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("Retorno de dados com celular foi com sucesso")
    void findByContatoCelular() {
        // Setup
        Contato contato = new Contato();
        contato.setNome("Teste");
        contato.setEmail("teste@example.com");
        contato.setCelular("123456789");
        contato.setTelefone("987654321");
        contato.setFavorito('S');
        contato.setAtivo('S');

        when(contatoRepository.findByCelular("123456789")).thenReturn(Optional.of(contato));

        // Execute
        Optional<Contato> found = contatoService.findbyContatoCelular("123456789");

        // Verify
        assertTrue(found.isPresent(), "Contato deveria ser encontrado pelo celular.");
        assertEquals("Teste", found.get().getNome());
        assertEquals("teste@example.com", found.get().getEmail());
        assertEquals("123456789", found.get().getCelular());
        assertEquals("987654321", found.get().getTelefone());
        assertEquals('S', found.get().getFavorito());
        assertEquals('S', found.get().getAtivo());

        verify(contatoRepository, times(1)).findByCelular("123456789");
    }

    @Test
    @DisplayName("Não deve retornar dados quando celular não existir")
    void findByContatoCelularNotFound() {

        when(contatoRepository.findByCelular("000000000")).thenReturn(Optional.empty());

        Optional<Contato> found = contatoService.findbyContatoCelular("000000000");

        assertFalse(found.isPresent(), "Contato não deveria ser encontrado pelo celular inexistente.");

        verify(contatoRepository, times(1)).findByCelular("000000000");
    }
}