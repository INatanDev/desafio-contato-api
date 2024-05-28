package com.inatandev.desafio_contatos_api.domain.repositors;

import com.inatandev.desafio_contatos_api.application.dto.ContatoRequestDTO;
import com.inatandev.desafio_contatos_api.domain.model.Contato;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
class ContatoRepositoryTest {

    @Autowired
    private ContatoRepository contatoRepository;

    @Test
    @DisplayName("Criacao e retorno de dados com celular foi com sucesso")
    public void testFindByCelular() {
        // Setup: criar e salvar um contato
        Contato contato = new Contato();
        contato.setNome("Teste");
        contato.setEmail("teste@example.com");
        contato.setCelular("123456789");
        contato.setTelefone("987654321");
        contato.setFavorito('S');
        contato.setAtivo('S');

        contatoRepository.save(contato);

        // Execute: buscar o contato pelo celular
        Optional<Contato> found = contatoRepository.findByCelular("123456789");

        // Verify: verificar se o contato foi encontrado
        assertTrue(found.isPresent());
        assertEquals("Teste", found.get().getNome());
        assertEquals("teste@example.com", found.get().getEmail());
        assertEquals("123456789", found.get().getCelular());
        assertEquals("987654321", found.get().getTelefone());
        assertEquals('S', found.get().getFavorito());
        assertEquals('S', found.get().getAtivo());
    }

    @Test
    @DisplayName("Retorno de dados com celular foi com sucesso")
    public void testFindByCelular2() {

        Contato contato = createBasicContato("Teste", "teste@example.com", "123456789", 'S', 'S');
        contatoRepository.save(contato);

        // Execute: buscar o contato pelo celular
        Optional<Contato> found = contatoRepository.findByCelular("123456789");

        // Verify: verificar se o contato foi encontrado
        assertTrue(found.isPresent(), "Contato deveria ser encontrado pelo celular.");
        assertEquals("Teste", found.get().getNome());
        assertEquals("teste@example.com", found.get().getEmail());
        assertEquals("123456789", found.get().getCelular());
        assertEquals('S', found.get().getFavorito());
        assertEquals('S', found.get().getAtivo());
    }

    private Contato createBasicContato(String nome, String email, String celular, char favorito, char ativo) {
        Contato contato = new Contato();
        contato.setNome(nome);
        contato.setEmail(email);
        contato.setCelular(celular);
        contato.setTelefone("987654321");
        contato.setFavorito(favorito);
        contato.setAtivo(ativo);
        contato.setCadastro(new Date());
        return contato;
    }
}