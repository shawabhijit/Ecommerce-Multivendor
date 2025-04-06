package com.ecom.Repository;

import com.ecom.Entity.WishList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishListRepo extends JpaRepository<WishList, Long> {
    WishList findByUserId(Long userId);

}
