package com.inatandev.desafio_contatos_api.domain.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.inatandev.desafio_contatos_api.application.dto.ContatoRequestDTO;
import com.inatandev.desafio_contatos_api.domain.model.Contato;
import com.inatandev.desafio_contatos_api.domain.repositors.ContatoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import com.inatandev.desafio_contatos_api.application.services.ContatoService;

import java.util.Collections;
import java.util.Date;
import java.util.Optional;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ContatoController.class)
@ExtendWith(MockitoExtension.class)
class ContatoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ContatoService contatoService;

    @MockBean
    private ContatoRepository contatoRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @InjectMocks
    private ContatoController contatoController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("Deve salvar um contato com sucesso")
    void saveContato() throws Exception{
        ContatoRequestDTO contatoRequestDTO = new ContatoRequestDTO(1L, "Teste", "teste@example.com", "123456789", "987654321", 'S', 'S');
        Contato contato = new Contato(contatoRequestDTO);
        contato.setId(1L);
        contato.setCadastro(new Date());

        when(contatoRepository.save(any(Contato.class))).thenReturn(contato);

        // Execute
        mockMvc.perform(post("/api/contato")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(contatoRequestDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(contato.getId()))
                .andExpect(jsonPath("$.nome").value(contato.getNome()))
                .andExpect(jsonPath("$.email").value(contato.getEmail()))
                .andExpect(jsonPath("$.celular").value(contato.getCelular()))
                .andExpect(jsonPath("$.telefone").value(contato.getTelefone()))
                .andExpect(jsonPath("$.favorito").value(String.valueOf(contato.getFavorito())))
                .andExpect(jsonPath("$.ativo").value(String.valueOf(contato.getAtivo())))
                .andExpect(jsonPath("$.cadastro").isNotEmpty());
    }

    @Test
    @DisplayName("Deve retornar todos os contatos")
    void getAll() throws Exception{

        Contato contato = new Contato();
        contato.setId(1L);
        contato.setNome("Teste");
        contato.setEmail("teste@example.com");
        contato.setCelular("123456789");
        contato.setTelefone("987654321");
        contato.setFavorito('S');
        contato.setAtivo('S');
        contato.setCadastro(new Date());

        when(contatoRepository.findAll()).thenReturn(Collections.singletonList(contato));


        mockMvc.perform(get("/api/contato")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(contato.getId()))
                .andExpect(jsonPath("$[0].nome").value(contato.getNome()))
                .andExpect(jsonPath("$[0].email").value(contato.getEmail()))
                .andExpect(jsonPath("$[0].celular").value(contato.getCelular()))
                .andExpect(jsonPath("$[0].telefone").value(contato.getTelefone()))
                .andExpect(jsonPath("$[0].favorito").value(String.valueOf(contato.getFavorito())))
                .andExpect(jsonPath("$[0].ativo").value(String.valueOf(contato.getAtivo())))
                .andExpect(jsonPath("$[0].cadastro").isNotEmpty());
    }


    @Test
    void findById() throws Exception{

        Long contatoId = 1L;
        Contato contato = new Contato();
        contato.setId(contatoId);
        contato.setNome("Teste");
        contato.setEmail("teste@example.com");
        contato.setCelular("123456789");
        contato.setTelefone("987654321");
        contato.setFavorito('S');
        contato.setAtivo('S');
        contato.setCadastro(new Date());

        when(contatoRepository.findById(contatoId)).thenReturn(Optional.of(contato));

        mockMvc.perform(get("/api/contato/{id}", contatoId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(contato.getId()))
                .andExpect(jsonPath("$.nome").value(contato.getNome()))
                .andExpect(jsonPath("$.email").value(contato.getEmail()))
                .andExpect(jsonPath("$.celular").value(contato.getCelular()))
                .andExpect(jsonPath("$.telefone").value(contato.getTelefone()))
                .andExpect(jsonPath("$.favorito").value(String.valueOf(contato.getFavorito())))
                .andExpect(jsonPath("$.ativo").value(String.valueOf(contato.getAtivo())))
                .andExpect(jsonPath("$.cadastro").isNotEmpty());
    }

    @Test
    void updateContato() throws Exception {

        Long contatoId = 1L;
        ContatoRequestDTO contatoRequestDTO = new ContatoRequestDTO(contatoId,"Teste Atualizado", "teste.atualizado@example.com", "987654321", "123456789", 'N', 'S');
        Contato contatoExistente = new Contato(contatoRequestDTO);
        contatoExistente.setCadastro(new Date());

        when(contatoRepository.findById(contatoId)).thenReturn(Optional.of(contatoExistente));
        when(contatoRepository.save(any(Contato.class))).thenReturn(contatoExistente);

        mockMvc.perform(put("/api/contato/{id}", contatoId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(contatoRequestDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(contatoExistente.getId()))
                .andExpect(jsonPath("$.nome").value(contatoExistente.getNome()))
                .andExpect(jsonPath("$.email").value(contatoExistente.getEmail()))
                .andExpect(jsonPath("$.celular").value(contatoExistente.getCelular()))
                .andExpect(jsonPath("$.telefone").value(contatoExistente.getTelefone()))
                .andExpect(jsonPath("$.favorito").value(String.valueOf(contatoExistente.getFavorito())))
                .andExpect(jsonPath("$.ativo").value(String.valueOf(contatoExistente.getAtivo())))
                .andExpect(jsonPath("$.cadastro").isNotEmpty());
    }
}