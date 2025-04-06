package com.ecom.Repository;

import com.ecom.Entity.DealEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DealRepo extends JpaRepository<DealEntity, Integer> {
}
