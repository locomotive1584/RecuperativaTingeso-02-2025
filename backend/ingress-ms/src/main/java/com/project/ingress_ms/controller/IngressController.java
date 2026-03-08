package com.project.ingress_ms.controller;

import com.project.ingress_ms.entities.IngressEntity;
import com.project.ingress_ms.services.IngressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ingress/")
public class IngressController {
    @Autowired
    IngressService ingressService;

    @GetMapping("ping")
    public ResponseEntity<Boolean> ping() {
        return ResponseEntity.ok(ingressService.ping());
    }

    @GetMapping("all")
    public ResponseEntity<List<IngressEntity>> getAll(){
        return ResponseEntity.ok(ingressService.getAllIngress());
    }

    @PostMapping("")
    public ResponseEntity<IngressEntity> addIngress(@RequestBody IngressEntity ingress) throws Exception{
        return ResponseEntity.ok(ingressService.saveIngress(ingress));
    }
}
