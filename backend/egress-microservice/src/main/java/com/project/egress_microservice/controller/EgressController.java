package com.project.egress_microservice.controller;

import com.project.egress_microservice.services.EgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/egress")
public class EgressController {
    @Autowired
    EgressService egressService;
}
