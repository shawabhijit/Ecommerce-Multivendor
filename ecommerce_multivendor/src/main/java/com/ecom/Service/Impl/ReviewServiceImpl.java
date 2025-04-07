package com.ecom.Service.Impl;

import com.ecom.Entity.ProductEntity;
import com.ecom.Entity.ReviewEntity;
import com.ecom.Entity.UserEntity;
import com.ecom.Exceptions.ReviewExceptions;
import com.ecom.Repository.ReviewRepo;
import com.ecom.Request.CreateReviewRequest;
import com.ecom.Service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepo reviewRepo;

    @Override
    public ReviewEntity createReview(CreateReviewRequest req, UserEntity user, ProductEntity product) {
        ReviewEntity review = new ReviewEntity();
        review.setUser(user);
        review.setProduct(product);
        review.setReviewText(req.getReviewText());
        review.setRating(req.getReviewRating());
        review.setProductImages(req.getProductImages());
        product.getReviews().add(review);

        return reviewRepo.save(review);
    }

    @Override
    public List<ReviewEntity> getReviewByProductId(Long productId) {
        return reviewRepo.findByProduct(productId);
    }

    @Override
    public ReviewEntity updateReview(Long reviewId, String reviewTest, double reviewRating, Long userId) throws ReviewExceptions {
        ReviewEntity review = getReviewById(reviewId);
        if (review.getUser().getId().equals(userId)) {
            review.setReviewText(reviewTest);
            review.setRating(reviewRating);
            return reviewRepo.save(review);
        }
        else {
            throw new ReviewExceptions("You can't update this review...");
        }
    }

    @Override
    public void deleteReview(Long reviewId, Long userId) throws ReviewExceptions {
        ReviewEntity review = getReviewById(reviewId);
        if (review.getUser().getId().equals(userId)) {
            throw new ReviewExceptions("You can't delete this review..");
        }
    }

    @Override
    public ReviewEntity getReviewById(Long reviewId) throws ReviewExceptions {
        return reviewRepo.findById(reviewId).orElseThrow(() -> new ReviewExceptions("Review Not Found..."));
    }
}
