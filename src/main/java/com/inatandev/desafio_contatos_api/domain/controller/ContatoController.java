package com.inatandev.desafio_contatos_api.domain.controller;

import com.inatandev.desafio_contatos_api.domain.model.Contato;
import com.inatandev.desafio_contatos_api.domain.repositors.ContatoRepository;
import com.inatandev.desafio_contatos_api.application.dto.ContatoRequestDTO;
import com.inatandev.desafio_contatos_api.application.dto.ContatoResponseDTO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/contato")
public class ContatoController {

    @Autowired
    private ContatoRepository repository;

    @PostMapping("/salvarContato")
    public ResponseEntity<ContatoResponseDTO> saveContato(@RequestBody ContatoRequestDTO data) {
        Contato contatoData = new Contato(data);
        contatoData.setContato_dh_cad(new Date());
        return ResponseEntity.ok( new ContatoResponseDTO(repository.save(contatoData)));
    }

    @GetMapping
    public List<ContatoResponseDTO> getAll(){

        List<ContatoResponseDTO> contatoLista = repository.findAll()
                .stream()
                .map(ContatoResponseDTO::new).toList();
        return contatoLista;
    }

    @GetMapping("{id}")
    public ResponseEntity<ContatoResponseDTO> findById(@PathVariable Long id){
        Contato contatoPorID = repository.findById(id).orElseThrow(
                () -> new RuntimeException("Contato nao encontrado")
        );
        return ResponseEntity.ok(new ContatoResponseDTO(contatoPorID));
    }

    @PutMapping("{id}")
    public ResponseEntity<ContatoResponseDTO> updateContato(@PathVariable Long id, @RequestBody ContatoRequestDTO data){
        Contato contatos = repository.findById(id).orElseThrow(
                () -> new RuntimeException("Contato não encontrado!")
        );
        BeanUtils.copyProperties(data, contatos, "contatos_id", "contatos_dh_cad");

        Contato contatoAtualizado = repository.save(contatos);

        ContatoResponseDTO responseDTO = new ContatoResponseDTO(contatoAtualizado);
        return ResponseEntity.ok(responseDTO);
    }



}
