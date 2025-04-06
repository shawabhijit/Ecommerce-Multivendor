package com.ecom.Service;

import com.ecom.Entity.ProductEntity;
import com.ecom.Entity.ReviewEntity;
import com.ecom.Entity.UserEntity;
import com.ecom.Request.CreateReviewRequest;

import java.util.List;

public interface ReviewService {

    ReviewEntity createReview(CreateReviewRequest req , UserEntity user , ProductEntity product );
    List<ReviewEntity> getReviewByProductId (Long productId);
    ReviewEntity updateReview(Long reviewId , String reviewTest , double reviewRating , Long userId) throws Exception;
    void deleteReview(Long reviewId , Long userId) throws Exception;
    ReviewEntity getReviewById(Long reviewId) throws Exception;
}
