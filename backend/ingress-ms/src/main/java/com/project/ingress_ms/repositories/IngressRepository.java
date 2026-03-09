package com.project.ingress_ms.repositories;

import com.project.ingress_ms.entities.IngressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IngressRepository extends JpaRepository<IngressEntity, Long> {

    public List<IngressEntity> findAll();

    @Query(value = "SELECT * FROM inputs ORDER BY inputs.date ASC", nativeQuery = true)
    public List<IngressEntity> findAllOrderByDateAsc();


}
