package com.project.egress_microservice.controller;

import com.project.egress_microservice.services.EgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.egress_microservice.entities.EgressEntity;

import java.util.List;

@RestController
@RequestMapping("/egress")
public class EgressController {
    @Autowired
    EgressService egressService;

    @GetMapping("/ping")
    public ResponseEntity<Boolean> ping() {
        return ResponseEntity.ok(egressService.ping());
    }


    @GetMapping("/all")
    public ResponseEntity<List<EgressEntity>> getAll(){
        return ResponseEntity.ok(egressService.getAllEgress());
    }

    @GetMapping("/all/sorted")
    public ResponseEntity<List<EgressEntity>> getAllOrderByDate(){
        return ResponseEntity.ok(egressService.getAllEgressOrderByDate());
    }

    @PostMapping("/")
    public ResponseEntity<EgressEntity> addEgress(@RequestBody EgressEntity egress) throws Exception{
        return ResponseEntity.ok(egressService.saveEgress(egress));
    }
}
