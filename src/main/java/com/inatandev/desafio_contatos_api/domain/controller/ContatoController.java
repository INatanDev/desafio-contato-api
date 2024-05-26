package com.inatandev.desafio_contatos_api.domain.controller;

import com.inatandev.desafio_contatos_api.application.ContatoService;
import com.inatandev.desafio_contatos_api.domain.model.Contato;
import com.inatandev.desafio_contatos_api.domain.repositors.ContatoRepository;
import com.inatandev.desafio_contatos_api.application.dto.ContatoRequestDTO;
import com.inatandev.desafio_contatos_api.application.dto.ContatoResponseDTO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/contato")
public class ContatoController {

    @Autowired
    private ContatoRepository repository;

    @Autowired
    private ContatoService service;

    @PostMapping("/salvarContato")
    public ResponseEntity<ContatoResponseDTO> saveContato(@RequestBody ContatoRequestDTO data) {

        //validacao do celular
        validaCelular(data);

        Contato contatoData = new Contato(data);
        contatoData.setCadastro(new Date());
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
        BeanUtils.copyProperties(data, contatos, "id", "cadastro");

        Contato contatoAtualizado = repository.save(contatos);

        ContatoResponseDTO responseDTO = new ContatoResponseDTO(contatoAtualizado);
        return ResponseEntity.ok(responseDTO);
    }


    private void validaCelular(ContatoRequestDTO data){
        Optional<Contato>  obj = service.findbyContatoCelular(data.celular());

        if (obj.isPresent() && obj.get().getId() != data.id()){
            throw new DataIntegrityViolationException("Celular já está sendo usado!");
        }
    }

}
