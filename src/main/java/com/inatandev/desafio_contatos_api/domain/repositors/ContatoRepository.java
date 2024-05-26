package com.inatandev.desafio_contatos_api.domain.repositors;

import com.inatandev.desafio_contatos_api.domain.model.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ContatoRepository extends JpaRepository<Contato, Long> {

    Optional<Contato> findByCelular(String celular);

}
