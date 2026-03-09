package com.project.ingress_ms.services;

import com.project.ingress_ms.entities.IngressEntity;
import com.project.ingress_ms.repositories.IngressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngressService {

    @Autowired
    IngressRepository ingressRepository;

    public boolean ping(){
        return true;
    }

    public IngressEntity saveIngress(IngressEntity ingressEntity) throws Exception{
        try {
            return ingressRepository.save(ingressEntity);
        } catch (Exception e) {
            throw new Exception("Error al guardar ingreso, error: " + e.getMessage());
        }
    }

    public List<IngressEntity> getAllIngress(){
        return ingressRepository.findAll();
    }

    public List<IngressEntity> getAllIngressOrderByDate(){
        return ingressRepository.findAllOrderByDateAsc();
    }
}
