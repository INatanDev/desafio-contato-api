package com.inatandev.desafio_contatos_api.application;

import com.inatandev.desafio_contatos_api.domain.model.Contato;
import com.inatandev.desafio_contatos_api.domain.repositors.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ContatoService {

    @Autowired
    private ContatoRepository repository;

    public Optional<Contato> findbyContatoCelular(String contato_celular) {
        return repository.findByCelular(contato_celular);
    }
}
