package com.project.egress_microservice.services;

import com.project.egress_microservice.entities.EgressEntity;
import com.project.egress_microservice.repositories.EgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EgressService {

    @Autowired
    EgressRepository egressRepository;
    
    public boolean ping(){
        return true;
    }

    public EgressEntity saveIngress(EgressEntity egressEntity) throws Exception{
        try {
            return egressRepository.save(egressEntity);
        } catch (Exception e) {
            throw new Exception("Error al guardar egreso, error: " + e.getMessage());
        }
    }

    public List<EgressEntity> getAllIngress(){
        return egressRepository.findAll();
    }
    
}
