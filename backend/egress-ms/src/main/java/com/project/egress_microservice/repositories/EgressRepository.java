package com.project.egress_microservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.egress_microservice.entities.EgressEntity;

import java.util.List;

public interface EgressRepository extends JpaRepository<EgressEntity, Long> {

    public List<EgressEntity> findAll();
}
