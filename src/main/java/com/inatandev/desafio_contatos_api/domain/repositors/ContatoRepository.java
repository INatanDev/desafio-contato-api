package com.inatandev.desafio_contatos_api.domain.repositors;

import com.inatandev.desafio_contatos_api.domain.model.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository<Contato, Long> {
}
