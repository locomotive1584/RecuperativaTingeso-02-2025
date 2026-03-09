package com.project.egress_microservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.egress_microservice.entities.EgressEntity;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EgressRepository extends JpaRepository<EgressEntity, Long> {

    public List<EgressEntity> findAll();

    @Query(value = "SELECT * FROM outputs ORDER BY outputs.date ASC", nativeQuery = true)
    public List<EgressEntity> findAllOrderByDateAsc();

}
