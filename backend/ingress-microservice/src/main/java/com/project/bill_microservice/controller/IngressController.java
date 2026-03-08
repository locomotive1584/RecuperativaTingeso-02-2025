package com.project.bill_microservice.controller;

import com.project.bill_microservice.services.IngressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ingress")
public class IngressController {
    @Autowired
    IngressService ingressService;



}
