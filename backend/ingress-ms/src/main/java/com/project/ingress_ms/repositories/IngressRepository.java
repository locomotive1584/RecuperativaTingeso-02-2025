package com.project.ingress_ms.repositories;

import com.project.ingress_ms.entities.IngressEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngressRepository extends JpaRepository<IngressEntity, Long> {

    public List<IngressEntity> findAll();


}
